export async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Error al cargar productos');
  return await res.json();
}
