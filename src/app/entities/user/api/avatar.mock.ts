export const uploadAvatarMock = async (file: File): Promise<string> => {
  await new Promise(res => setTimeout(res, 600));

  // имитация CDN ссылки
  return URL.createObjectURL(file);
};

export const deleteAvatarMock = async (): Promise<void> => {
  await new Promise(res => setTimeout(res, 300));
};
