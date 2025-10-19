export const convertBytesToMBytes = (bytes: number): string => {
  if (bytes) {
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) as any, 10);
    if (i === 0) {
      return `${bytes} ${sizes[i]})`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }
};
