export const secondsToRuntime = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  return `${hour}h ${minute}m`;
};
