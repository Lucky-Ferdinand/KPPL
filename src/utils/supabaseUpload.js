import { supabase } from "./supabaseClient";

export const uploadToSupabase = async (file) => {
  if (!file) throw new Error("File tidak ditemukan");

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`; // folder opsional di bucket

  // Upload ke bucket "logos"
  const { error: uploadError } = await supabase.storage
    .from("logos")
    .upload(filePath, file);

  if (uploadError) {
    throw new Error("Gagal upload logo: " + uploadError.message);
  }

  const { data: publicData, error: urlError } = supabase.storage
    .from("logos")
    .getPublicUrl(filePath);

  if (urlError || !publicData?.publicUrl) {
    throw new Error("Gagal mendapatkan URL logo");
  }

  return publicData.publicUrl;
};
