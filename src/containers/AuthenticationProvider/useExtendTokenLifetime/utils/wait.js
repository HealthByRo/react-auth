export default async function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
