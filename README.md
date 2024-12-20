# Sistema de Gestión de Productos

## Descripción General

Este sistema permite gestionar productos a través de un carrito de compras. Los usuarios pueden crear carritos, agregar productos, y aplicar filtros para visualizar los productos de manera efectiva. La aplicación también incluye una funcionalidad en tiempo real utilizando sockets.

## Navegación

### Navbar

El navbar proporciona acceso a las diferentes funcionalidades del sistema:

- **Productos**: Muestra la lista de productos disponibles.
- **RealTime**: Acceso a la funcionalidad en tiempo real mediante sockets.
- **Carts**: Permite gestionar los carritos de compras.

### Funcionalidades del Navbar

1. **Crear Carrito**:
   - Un botón en el navbar permite a los usuarios crear un nuevo carrito. Este botón debe estar habilitado para que los usuarios puedan comenzar a agregar productos.

2. **Asignar Carrito**:
   - Al hacer clic en el botón "Carts", los usuarios pueden ver los carritos existentes. Desde aquí, pueden vaciar el carrito, ver los productos en el carrito, o eliminar productos específicos.

3. **Filtros de Productos**:
   - En el navbar, se encuentran los siguientes campos para filtrar los productos:
     - **Categoría**: Permite seleccionar una categoría específica de productos.
     - **Orden**: Permite ordenar los productos en orden ascendente o descendente.
     - **Límite**: Establece un límite en la cantidad de productos mostrados. **Nota**: Este campo puede no funcionar correctamente si no hay otro query establecido previamente.
     - **Disponibilidad**: Permite filtrar los productos según su disponibilidad (disponibles o no disponibles).

### RealTime

- La sección de RealTime utiliza sockets para proporcionar actualizaciones en tiempo real sobre los productos y carritos. Esto permite a los usuarios ver cambios instantáneamente sin necesidad de recargar la página.

