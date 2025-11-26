import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 150 },
    { duration: '90s', target: 150 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.05'],
    errors: ['rate<0.05'],
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

  if (usePost) {
    const productData = JSON.stringify({
      title: `Load Test Product ${Math.random()}`,
      price: Math.random() * 1000,
      description: 'Product created during load test',
      image: 'https://example.com/test.jpg',
      category: 'electronics'
    });
    
    const response = http.post(`${baseUrl}/products`, productData, params);
    const success = check(response, {
      'POST /products status is 200': (r) => r.status === 200,
      'POST /products response time < 2000ms': (r) => r.timings.duration < 2000,
    });
    errorRate.add(!success);
  } else {
    const response = http.get(`${baseUrl}/products`, params);
    const success = check(response, {
      'GET /products status is 200': (r) => r.status === 200,
      'GET /products response time < 2000ms': (r) => r.timings.duration < 2000,
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

  sleep(1);
}

export function handleSummary(data) {
  return {
    'reports/load-test-report.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

