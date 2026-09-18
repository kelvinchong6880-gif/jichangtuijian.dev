import { getCollection } from 'astro:content';

export const getBrands = async () => {
  const allBrands = await getCollection('brands');
  const isDev = import.meta.env.DEV; 
  const isPreview = import.meta.env.IS_PREVIEW === 'true'; 
  
  if (isDev || isPreview) {
    return allBrands.sort((a, b) => a.data.sort_order - b.data.sort_order || a.data.name.localeCompare(b.data.name));
  }
  
  const realBrands = allBrands.filter(b => !b.data.is_dummy);
  
  if (realBrands.length === 0) {
    throw new Error("【构建阻止】正式构建必须包含至少一个真实的非占位品牌数据！请删除演示文件并填充真实资料。");
  }
  
  return realBrands.sort((a, b) => a.data.sort_order - b.data.sort_order || a.data.name.localeCompare(b.data.name));
};
