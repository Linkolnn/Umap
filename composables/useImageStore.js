export function useImageStore() {
  const saveImage = (id, imageData) => {
    localStorage.setItem(`placemark_image_${id}`, imageData);
  };

  const getImage = (id) => {
    return localStorage.getItem(`placemark_image_${id}`) || '';
  };

  const deleteImage = (id) => {
    localStorage.removeItem(`placemark_image_${id}`);
  };

  return {
    saveImage,
    getImage,
    deleteImage
  };
}
