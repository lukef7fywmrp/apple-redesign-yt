export const fetchLineItems = async (sessionId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSession?session_id=${sessionId}`
  );

  if (!res.ok) return;

  const data = await res.json();
  const products = data.session.data;

  return products;
};
