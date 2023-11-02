import Stripe from 'stripe'

export const stripe = new Stripe(
  'sk_test_51O2jymCIw2mxE88LUpHs4gvgMUwNcc4DPKPcDB16a174gue8y3Qj8eM9YCZHUKubB53NPxt9hdyevVUASnQc7rwV00fmnqZ2T2',
  {
    apiVersion: '2023-10-16',
  }
)
