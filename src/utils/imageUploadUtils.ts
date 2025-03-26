
export const uploadProfileImage = (file: File, callback: (url: string) => void) => {
  // In a real app, this would upload to a server/cloud storage
  // For demo purposes, we'll create a local object URL
  const reader = new FileReader();
  
  reader.onload = (e) => {
    if (e.target && e.target.result) {
      // Convert to data URL
      const imageUrl = e.target.result.toString();
      
      // Store in localStorage for persistence
      localStorage.setItem('userProfileImage', imageUrl);
      
      // Call the callback with the image URL
      callback(imageUrl);
    }
  };
  
  reader.readAsDataURL(file);
};
