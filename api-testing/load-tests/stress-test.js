import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const errorRate = new Rate('errors');
const responseTime = new Trend('response_time');

export const options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '1m', target: 250 },
    { duration: '1m', target: 400 },
    { duration: '1m', target: 550 },
    { duration: '1m', target: 700 },
    { duration: '1m', target: 850 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 1000 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.1'],
    errors: ['rate<0.1'],
  },
};

export default function () {
  const baseUrl = 'https://fakestoreapi.com';
  
  const usePost = Math.random() < 0.5;
  
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const startTime = Date.now();

  if (usePost) {
    const productData = JSON.stringify({
      title: `Stress Test Product ${Math.random()}`,
      price: Math.random() * 1000,
      description: 'Product created during stress test',
      image: 'https://example.com/test.jpg',
      category: 'electronics'
    });
    
    const response = http.post(`${baseUrl}/products`, productData, params);
    const duration = Date.now() - startTime;
    responseTime.add(duration);
    
    const success = check(response, {
      'POST /products status is 200': (r) => r.status === 200,
      'POST /products response time < 5000ms': (r) => r.timings.duration < 5000,
    });
    errorRate.add(!success);
  } else {
    const response = http.get(randomEndpoint, params);
    const duration = Date.now() - startTime;
    responseTime.add(duration);
    
    const success = check(response, {
      'GET /products status is 200': (r) => r.status === 200,
      'GET /products response time < 5000ms': (r) => r.timings.duration < 5000,
      'GET /products has products': (r) => {
        try {
          const body = JSON.parse(r.body);
          return Array.isArray(body) && body.length > 0;
        } catch (e) {
          return false;
        }
      },
    });
    errorRate.add(!success);
  }

  sleep(0.5);
}

export function handleSummary(data) {
  return {
    'reports/stress-test-report.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

