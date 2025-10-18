import React from "react";

// 1. Definimos un tipo genérico para las columnas.
// 'T' será el tipo de dato de cada fila (ej. la interfaz 'Book').
export interface ColumnDef<T> {
  /** El texto que aparecerá en la cabecera de la tabla. */
  header: string;
  /**
   * Una función que recibe una fila de datos y devuelve el contenido de la celda.
   * Puede devolver un string, un número o incluso otro componente de React (ej. un botón).
   */
  cell: (row: T) => React.ReactNode;
}

// 2. Definimos las props del componente de Tabla.
export interface TableProps<T> {
  /** El array de datos a mostrar. */
  data: T[];
  /** La definición de las columnas a renderizar. */
  columns: ColumnDef<T>[];
  /** Un título opcional para la tabla, importante para accesibilidad. */
  caption?: string;
}

// 3. Creamos el componente genérico 'Table'.
export const Table = <T extends object>({
  data,
  columns,
  caption,
}: TableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-neutral-100 shadow-subtle bg-paper">
      <table className="w-full text-sm text-left text-neutral-900">
        {caption && (
          <caption className="p-4 text-lg font-semibold text-left text-neutral-900 bg-paper">
            {caption}
          </caption>
        )}
        <thead className="text-xs text-neutral-500 uppercase bg-neutral-100">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-paper border-b border-neutral-100 hover:bg-neutral-100/50"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            // Mensaje para cuando no hay datos
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-neutral-500"
              >
                No hay datos para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
