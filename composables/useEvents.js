import { useCookie } from '#app';
import { useAuth } from '@composables/useAuth';
import { useImageStore } from '@composables/useImageStore';

export function useEvents() {
  const { currentUser } = useAuth();
  const { saveImage, getImage } = useImageStore();
  
  const placemarks = useCookie('user_placemarks', {
    default: () => ({}),
    sameSite: 'strict',
    path: '/',
    maxAge: 172800
  });

  const saveUserPlacemarks = async (userPlacemarks) => {
    if (!currentUser.value) return;

    const placemarksWithoutImages = userPlacemarks.map(placemark => {
      if (placemark.img) {
        saveImage(placemark.id, placemark.img);
      }
      const { img, ...placemarkWithoutImage } = placemark;
      return placemarkWithoutImage;
    });

    const username = currentUser.value.name;
    placemarks.value = { 
      ...placemarks.value,
      [username]: placemarksWithoutImages
    };
  };

  const getUserPlacemarks = () => {
    if (!currentUser.value) return [];
    
    const username = currentUser.value.name;
    return (placemarks.value[username] || []).map(placemark => ({
      ...placemark,
      img: getImage(placemark.id)
    }));
  };

  return { getUserPlacemarks, saveUserPlacemarks };
}