export function generateRandomData() {
  const data = [];
  let previousTpr = 0;

  for (let i = 0; i <= 10; i++) {
    const fpr = i / 10;
    const tpr = previousTpr + Math.random() * (1 - previousTpr);
    data.push({ fpr, tpr });
    previousTpr = tpr;
  }

  return data;
}
