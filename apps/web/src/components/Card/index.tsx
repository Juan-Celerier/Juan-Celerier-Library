import React from "react";

/**
 * Card - Contenedor versátil para agrupar contenido
 */
export function Card({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-white shadow-subtle transition-all duration-200 hover:shadow-medium ${className}`}
      {...props}
    />
  );
}

/**
 * CardHeader - Sección del header de la tarjeta
 */
export function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-lg py-md pb-2 ${className}`} {...props} />;
}

/**
 * CardTitle - Título de la tarjeta
 */
export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`text-heading-md font-semibold text-neutral-900 ${className}`}
      {...props}
    />
  );
}

/**
 * CardDescription - Descripción o subtítulo
 */
export function CardDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-body-sm text-neutral-600 mt-1 ${className}`}
      {...props}
    />
  );
}

/**
 * CardContent - Contenido principal de la tarjeta
 */
export function CardContent({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-lg py-md ${className}`} {...props} />;
}

/**
 * CardFooter - Sección del footer de la tarjeta
 */
export function CardFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-lg py-md border-t border-neutral-200 bg-neutral-50 transition-colors duration-200 ${className}`}
      {...props}
    />
  );
}
