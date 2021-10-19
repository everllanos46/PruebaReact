# APIS
Se hizo uso de varias APIS externas para el correcto funcionamiento del programa, una de las APIS fue la de newsapi, encargada de devolvernos las noticias dependiendo del país que se le manda, otra API fue la de universal-tutorial, encargada de devolvernos la lista de países, de sus estaodos y de las ciudades, y la última API externa fue la de weatherbit, encargada de devolvernos algunos datos acerca del clima dependiendo de la ciudad que le enviemos.

Se creó una API propia encargada de guardar el historial de busqueda y también encargada de traerlo

# Components Visuales
Para los componentes visuales se usó Material-Ui, Ant-Design y React-Bootstrap

# Hooks
Cada componente hace uso de varios custom hooks de react

# Middleware
Se creó y configuró un Middleware, haciendo que este tuviera un control de las peticiones que se hacen a las diferentes APIS utilizadas en el programa

# Redux
Se hizo uso del patrón Redux, pero no se pudo usar los Reducers o estados globales

# Endpoint
Se crearon los endpoints solicitados, permitiendo que cada uno pudiera obtener los json de las diferentes consultas, usando la libreria Axios y separados por archivos de "acciones" encargado de realizar las peticiones a sus respectivas APIS