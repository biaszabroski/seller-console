export function paginate<T>(data: T[], currentPage: number, pageSize: number) {
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return { paginatedData, totalPages };
}
