export interface Product {
    id: string; // Identificador único del producto
    name: string; // Nombre del producto
    description: string; // Descripción breve o detallada
    price: number; // Precio del producto
    discountPrice?: number; // Precio con descuento (opcional)
    currency: string; // Moneda del precio (e.g., USD, EUR)
    images: string[]; // URLs de imágenes del producto
    thumbnail: string; // URL de la imagen en miniatura
    stock: number; // Cantidad disponible en inventario
    categories: string[]; // Categorías a las que pertenece el producto
    tags?: string[]; // Etiquetas relacionadas
    sku: string; // Código de referencia del producto
    weight?: number; // Peso del producto (opcional)
    dimensions?: { // Dimensiones físicas (opcional)
      length: number;
      width: number;
      height: number;
    };
    brand?: string; // Marca del producto
    ratings?: { // Calificaciones del producto
      average: number; // Promedio de calificaciones
      count: number; // Cantidad de reseñas
    };
    reviews?: Review[]; // Lista de reseñas del producto (ver interfaz Review abajo)
    availability: 'in_stock' | 'out_of_stock' | 'pre_order'; // Estado de disponibilidad
    createdAt: Date; // Fecha de creación del producto
    updatedAt?: Date; // Fecha de última actualización
    seller?: { // Información del vendedor (opcional)
      id: string;
      name: string;
      contact?: string;
    };
    variants?: Variant[]; // Variaciones del producto (ver interfaz Variant abajo)
    metadata?: Record<string, any>; // Campo adicional para datos específicos del producto
  }
  
  // Interfaz para una reseña de producto
  export interface Review {
    id: string; // Identificador único de la reseña
    userId: string; // ID del usuario que dejó la reseña
    username: string; // Nombre del usuario
    rating: number; // Calificación otorgada (1-5)
    comment: string; // Comentario de la reseña
    createdAt: Date; // Fecha de creación de la reseña
  }
  
  // Interfaz para una variante de producto
  export interface Variant {
    id: string; // Identificador único de la variante
    name: string; // Nombre de la variante (e.g., "Rojo", "Talla M")
    price?: number; // Precio específico de la variante (opcional)
    stock: number; // Stock disponible de la variante
    sku?: string; // SKU específico de la variante (opcional)
  }
  