GRADE-PILOT – Corrector automático de exámenes tipo test
========================================================

URL de acceso:
https://grade-pilot-1.onrender.com


¿QUÉ ES GRADE-PILOT?
-------------------
Grade-Pilot es una aplicación web que permite corregir automáticamente
exámenes tipo test a partir de un archivo Excel, generando:

- Calificaciones individuales
- Métricas globales del examen
- Análisis por pregunta y por opción
- Exportación de resultados a Excel y PDF

No requiere instalación ni configuración: se usa directamente desde el navegador.


CÓMO FUNCIONA (PASO A PASO)
---------------------------

1. Acceder a la aplicación
   Abrir en el navegador la URL:
   https://grade-pilot-1.onrender.com

2. Preparar el archivo Excel
   El archivo debe cumplir esta estructura:

   - Columna A: DNI o identificador del alumno
   - Columnas B en adelante: respuestas del examen
   - Fila 2 (primera fila de respuestas): CLAVE de respuestas correctas
   - A partir de la fila 3: respuestas de los alumnos

   Ejemplo:
   DNI | P1 | P2 | P3 | ...
   --- |----|----|----
        A  | C  | B   ← clave
   123 | A  | C  | B
   456 | A  | D  | B

   Las respuestas pueden ser:
   - Una opción: A
   - Varias opciones: A,C

3. Configurar el examen
   Antes de subir el archivo, seleccionar:
   - Número de preguntas (entre 5 y 20)
   - Número de opciones por pregunta (3, 4 o 5)

4. Subir el archivo
   - Pulsar “Subir archivo”
   - La aplicación valida automáticamente la estructura
   - Si hay errores, se muestra un mensaje explicativo

5. Resultados
   Una vez corregido el examen, la aplicación muestra:
   - Lista de alumnos con nota
   - Número de presentados / no presentados
   - Nota media, máxima y mínima
   - Porcentaje de aprobados
   - Estadísticas por pregunta y por opción

6. Exportación
   Desde la aplicación se puede:
   - Descargar el Excel corregido
   - Exportar un informe en PDF con tablas y gráficos


CRITERIO DE CORRECCIÓN
----------------------
- Cada pregunta puntúa un máximo de 1 punto
- Las preguntas pueden tener:
  - Una respuesta correcta
  - Varias respuestas correctas
- Las respuestas incorrectas penalizan proporcionalmente
- La nota final nunca es negativa (mínimo 0)


VENTAJAS PRINCIPALES
--------------------
- Corrección automática y rápida
- Evita errores manuales
- Análisis estadístico inmediato
- Exportación directa de resultados
- No requiere instalación
- Accesible desde cualquier navegador


ESTADO ACTUAL
-------------
Esta versión es una primera versión funcional desplegada en la nube,
orientada a validación de flujo y utilidad.

Está pensada para:
- Pruebas
- Demostraciones
- Validación del concepto

La arquitectura permite futuras mejoras como:
- Guardado histórico de exámenes
- Gestión de usuarios
- Configuración avanzada de criterios de corrección


CONTACTO / DESARROLLO
---------------------
Aplicación desarrollada como herramienta de apoyo a la corrección
automática de exámenes tipo test.

Para cualquier duda o mejora, contactar con la persona responsable
del desarrollo.
