#include <iostream>
#include <cstring>
#include <cstdlib>
#include <ctime>
using namespace std;

/* ------- CONSTANTES ------- */
const int MAX_PACIENTES = 500;
const int MAX_ESPECIALIDADES = 100;

/* Estados turno */
const int ESTADO_ACTIVO = 1;
const int ESTADO_CANCELADO = 2;

/* ------- ESTRUCTURAS ------- */

/* Paciente: campos con longitudes razonables */
struct Paciente {
    char apellido[51];
    char nombre[51];
    char dni[15];
    char telefono[21];
};

/* Especialidad: codigo auto-incremental y descripcion */
struct Especialidad {
    int codigo;
    char nombre[51];
    char descripcion[101];
};

/* Nodo para lista enlazada de Turnos.
   Cada turno almacena fecha/hora en campos enteros (dia, mes, año, hora, minuto),
   dni del paciente como char[], codigo de especialidad, codigo del turno y estado.
*/
struct TurnoNodo {
    int codigo;
    int dia;
    int mes;
    int anio;
    int hora;
    int minuto;
    char pacienteDNI[15];
    int codigoEspecialidad;
    int estado; /* 1 Activo, 2 Cancelado */
    TurnoNodo *siguiente;
};

/* ------- ALMACENAMIENTO GLOBAL (simula "base de datos" en memoria) ------- */

/* Arreglos estáticos (entregas 1..3) */
Paciente pacientes[MAX_PACIENTES];
int cantidadPacientes = 0;

Especialidad especialidades[MAX_ESPECIALIDADES];
int cantidadEspecialidades = 0;

/* Lista enlazada de turnos (entrega 4: estructura dinámica con nodos) */
TurnoNodo *cabezaTurnos = NULL;

/* Contadores de códigos auto-incrementales */
int proximoCodigoEspecialidad = 1;
int proximoCodigoTurno = 1;

/* ------- FUNCIONES AUXILIARES (básicas) ------- */

/* Limpia el buffer de entrada cuando se usan cin >> ... y luego getline-like */
void limpiarBuffer() {
    int c;
    c = cin.get();
    while (c != '\n' && c != EOF) {
        c = cin.get();
    }
}

/* Comprueba si una cadena está vacía o sólo espacios */
bool esVacio(const char *s) {
    if (s == NULL) return true;
    int i = 0;
    while (s[i] != '\0') {
        /* si hay un caracter distinto de espacio o tab, no está vacía */
        if (s[i] != ' ' && s[i] != '\t' && s[i] != '\r' && s[i] != '\n') return false;
        i++;
    }
    return true;
}

/* Convierte fecha/hora a minutos "absolutos" para comparar (aprox).
   Utiliza struct tm y mktime para obtener time_t, luego divide por 60.
   Devuelve -1 en caso de error de parseo.
*/
long convertirFechaHoraAMinutos(int dia, int mes, int anio, int hora, int minuto) {
    struct tm t;
    t.tm_mday = dia;
    t.tm_mon = mes - 1; /* tm_mon 0..11 */
    t.tm_year = anio - 1900; /* tm_year desde 1900 */
    t.tm_hour = hora;
    t.tm_min = minuto;
    t.tm_sec = 0;
    t.tm_isdst = -1; /* calcular DST automáticamente */
    time_t tt = mktime(&t);
    if (tt == -1) return -1;
    return (long)(tt / 60); /* minutos desde epoch */
}

/* Devuelve minutos actuales desde epoch */
long minutosActuales() {
    time_t ahora = time(NULL);
    return (long)(ahora / 60);
}

/* Buscar paciente por DNI; si lo encuentra devuelve su índice en arreglo (0..n-1) y true.
   Si no lo encuentra, devuelve false. */
bool buscarPacientePorDNI(const char *dni, int &indiceOut) {
    int i;
    for (i = 0; i < cantidadPacientes; i = i + 1) {
        if (strcmp(pacientes[i].dni, dni) == 0) {
            indiceOut = i;
            return true;
        }
    }
    return false;
}

/* Buscar especialidad por codigo; devuelve índice si la encuentra */
bool buscarEspecialidadPorCodigo(int codigo, int &indiceOut) {
    int i;
    for (i = 0; i < cantidadEspecialidades; i = i + 1) {
        if (especialidades[i].codigo == codigo) {
            indiceOut = i;
            return true;
        }
    }
    return false;
}

/* Cuenta turnos activos de un paciente (recorre la lista enlazada) */
int contarTurnosActivosPaciente(const char *dni) {
    int cuenta = 0;
    TurnoNodo *actual = cabezaTurnos;
    while (actual != NULL) {
        if (actual->estado == ESTADO_ACTIVO && strcmp(actual->pacienteDNI, dni) == 0) {
            cuenta = cuenta + 1;
        }
        actual = actual->siguiente;
    }
    return cuenta;
}

/* Cuenta turnos activos para una especialidad */
int contarTurnosActivosEspecialidad(int codigoEsp) {
    int cuenta = 0;
    TurnoNodo *actual = cabezaTurnos;
    while (actual != NULL) {
        if (actual->estado == ESTADO_ACTIVO && actual->codigoEspecialidad == codigoEsp) {
            cuenta = cuenta + 1;
        }
        actual = actual->siguiente;
    }
    return cuenta;
}

/* Comprueba si existe un turno activo para un mismo paciente y misma especialidad */
bool existeTurnoActivoPacienteEspecial(const char *dni, int codigoEsp) {
    TurnoNodo *actual = cabezaTurnos;
    while (actual != NULL) {
        if (actual->estado == ESTADO_ACTIVO && strcmp(actual->pacienteDNI, dni) == 0 && actual->codigoEspecialidad == codigoEsp) {
            return true;
        }
        actual = actual->siguiente;
    }
    return false;
}

/* Buscar nodo de turno por codigo; devuelve puntero al nodo o NULL si no existe */
TurnoNodo* buscarTurnoPorCodigo(int codigo) {
    TurnoNodo *actual = cabezaTurnos;
    while (actual != NULL) {
        if (actual->codigo == codigo) return actual;
        actual = actual->siguiente;
    }
    return NULL;
}

/* Elimina un nodo de la lista por puntero (se espera la existencia).
   Si se elimina la cabeza se actualiza cabezaTurnos. */
void eliminarNodoTurno(TurnoNodo *prev, TurnoNodo *actual) {
    if (prev == NULL) {
        /* eliminar la cabeza */
        cabezaTurnos = actual->siguiente;
    } else {
        prev->siguiente = actual->siguiente;
    }
    delete actual;
}

/* ------- FUNCIONES PARA PACIENTES (ABM) ------- */

void altaPaciente() {
    if (cantidadPacientes >= MAX_PACIENTES) {
        cout << "No se pueden dar mas de alta: alcanzado maximo de pacientes.\n";
        return;
    }

    Paciente nuevo;
    cout << "Alta de paciente\n";
    cout << "Apellido: ";
    cin.getline(nuevo.apellido, 51);
    if (esVacio(nuevo.apellido)) {
        cout << "Apellido obligatorio. Alta abortada.\n";
        return;
    }

    cout << "Nombre: ";
    cin.getline(nuevo.nombre, 51);
    if (esVacio(nuevo.nombre)) {
        cout << "Nombre obligatorio. Alta abortada.\n";
        return;
    }

    cout << "DNI: ";
    cin.getline(nuevo.dni, 15);
    if (esVacio(nuevo.dni)) {
        cout << "DNI obligatorio. Alta abortada.\n";
        return;
    }
    /* comprobar dni unico */
    int idxPaciente;
    if (buscarPacientePorDNI(nuevo.dni, idxPaciente)) {
        cout << "Ya existe un paciente con ese DNI. Alta abortada.\n";
        return;
    }

    cout << "Telefono: ";
    cin.getline(nuevo.telefono, 21);
    if (esVacio(nuevo.telefono)) {
        cout << "Telefono obligatorio. Alta abortada.\n";
        return;
    }

    /* Guardar en arreglo */
    pacientes[cantidadPacientes] = nuevo;
    cantidadPacientes = cantidadPacientes + 1;
    cout << "Paciente dado de alta correctamente.\n";
}

void modificacionPaciente() {
    char dni[15];
    cout << "Modificacion de paciente - Ingrese DNI: ";
    cin.getline(dni, 15);
    int idx;
    if (!buscarPacientePorDNI(dni, idx)) {
        cout << "Paciente no encontrado.\n";
        return;
    }
    cout << "Paciente encontrado: " << pacientes[idx].apellido << ", " << pacientes[idx].nombre << "\n";
    cout << "1) Modificar nombre\n2) Modificar apellido\n3) Modificar telefono\nElija opcion (1-3): ";
    char opcion[4];
    cin.getline(opcion, 4);

    if (strcmp(opcion, "1") == 0) {
        cout << "Nuevo nombre: ";
        cin.getline(pacientes[idx].nombre, 51);
    } else if (strcmp(opcion, "2") == 0) {
        cout << "Nuevo apellido: ";
        cin.getline(pacientes[idx].apellido, 51);
    } else if (strcmp(opcion, "3") == 0) {
        cout << "Nuevo telefono: ";
        cin.getline(pacientes[idx].telefono, 21);
    } else {
        cout << "Opcion invalida.\n";
        return;
    }
    cout << "Datos actualizados.\n";
}

void bajaPaciente() {
    char dni[15];
    cout << "Baja de paciente - Ingrese DNI: ";
    cin.getline(dni, 15);
    int idx;
    if (!buscarPacientePorDNI(dni, idx)) {
        cout << "Paciente no encontrado.\n";
        return;
    }
    /* no permitir baja si tiene turnos activos */
    int activos = contarTurnosActivosPaciente(dni);
    if (activos > 0) {
        cout << "No se puede eliminar paciente: posee " << activos << " turno(s) activo(s).\n";
        return;
    }
    /* eliminar moviendo elementos del arreglo */
    int i;
    for (i = idx; i < cantidadPacientes - 1; i = i + 1) {
        pacientes[i] = pacientes[i + 1];
    }
    cantidadPacientes = cantidadPacientes - 1;
    cout << "Paciente eliminado correctamente.\n";
}

void listadoPacientesCompleto() {
    int i;
    if (cantidadPacientes == 0) {
        cout << "No hay pacientes registrados.\n";
        return;
    }
    cout << "Listado de pacientes:\n";
    for (i = 0; i < cantidadPacientes; i = i + 1) {
        cout << "Apellido: " << pacientes[i].apellido << " | Nombre: " << pacientes[i].nombre
             << " | DNI: " << pacientes[i].dni << " | Tel: " << pacientes[i].telefono << "\n";
    }
}

void buscarPaciente() {
    char dni[15];
    cout << "Busqueda paciente por DNI: ";
    cin.getline(dni, 15);
    int idx;
    if (!buscarPacientePorDNI(dni, idx)) {
        cout << "Paciente no encontrado.\n";
        return;
    }
    cout << "Apellido: " << pacientes[idx].apellido << "\n";
    cout << "Nombre: " << pacientes[idx].nombre << "\n";
    cout << "Telefono: " << pacientes[idx].telefono << "\n";
}

/* ------- FUNCIONES PARA ESPECIALIDADES (ABM) ------- */

void altaEspecialidad() {
    if (cantidadEspecialidades >= MAX_ESPECIALIDADES) {
        cout << "No se pueden dar mas de alta: alcanzado maximo de especialidades.\n";
        return;
    }
    Especialidad e;
    e.codigo = proximoCodigoEspecialidad;
    proximoCodigoEspecialidad = proximoCodigoEspecialidad + 1;

    cout << "Alta de especialidad\n";
    cout << "Nombre: ";
    cin.getline(e.nombre, 51);
    if (esVacio(e.nombre)) {
        cout << "Nombre obligatorio. Alta abortada.\n";
        return;
    }
    cout << "Descripcion (opcional): ";
    cin.getline(e.descripcion, 101);

    especialidades[cantidadEspecialidades] = e;
    cantidadEspecialidades = cantidadEspecialidades + 1;
    cout << "Especialidad dada de alta. Codigo: " << e.codigo << "\n";
}

void modificacionEspecialidad() {
    char buffer[10];
    cout << "Modificacion de especialidad - Ingrese codigo: ";
    cin.getline(buffer, 10);
    int codigo = atoi(buffer);
    int idx;
    if (!buscarEspecialidadPorCodigo(codigo, idx)) {
        cout << "Especialidad no encontrada.\n";
        return;
    }
    cout << "Nombre actual: " << especialidades[idx].nombre << "\n";
    cout << "Nuevo nombre: ";
    cin.getline(especialidades[idx].nombre, 51);
    cout << "Nueva descripcion: ";
    cin.getline(especialidades[idx].descripcion, 101);
    cout << "Especialidad modificada.\n";
}

void bajaEspecialidad() {
    char buffer[10];
    cout << "Baja de especialidad - Ingrese codigo: ";
    cin.getline(buffer, 10);
    int codigo = atoi(buffer);
    int idx;
    if (!buscarEspecialidadPorCodigo(codigo, idx)) {
        cout << "Especialidad no encontrada.\n";
        return;
    }
    /* no permitir baja si se usa en turnos activos */
    int activos = contarTurnosActivosEspecialidad(codigo);
    if (activos > 0) {
        cout << "No se puede eliminar: la especialidad tiene " << activos << " turno(s) activo(s).\n";
        return;
    }
    /* eliminar moviendo elementos */
    int i;
    for (i = idx; i < cantidadEspecialidades - 1; i = i + 1) {
        especialidades[i] = especialidades[i + 1];
    }
    cantidadEspecialidades = cantidadEspecialidades - 1;
    cout << "Especialidad eliminada.\n";
}

void listadoEspecialidadesCompleto() {
    int i;
    if (cantidadEspecialidades == 0) {
        cout << "No hay especialidades registradas.\n";
        return;
    }
    cout << "Listado de especialidades:\n";
    for (i = 0; i < cantidadEspecialidades; i = i + 1) {
        cout << "Codigo: " << especialidades[i].codigo << " | Nombre: " << especialidades[i].nombre
             << " | Desc: " << especialidades[i].descripcion << "\n";
    }
}

void buscarEspecialidad() {
    char buffer[10];
    cout << "Busqueda especialidad por codigo: ";
    cin.getline(buffer, 10);
    int codigo = atoi(buffer);
    int idx;
    if (!buscarEspecialidadPorCodigo(codigo, idx)) {
        cout << "Especialidad no encontrada.\n";
        return;
    }
    cout << "Codigo: " << especialidades[idx].codigo << "\n";
    cout << "Nombre: " << especialidades[idx].nombre << "\n";
    cout << "Descripcion: " << especialidades[idx].descripcion << "\n";
}

/* ------- FUNCIONES PARA TURNOS (lista enlazada) ------- */

/* Alta de turno: valida paciente y especialidad, impide duplicado paciente+especialidad activo,
   genera codigo automatico y agrega nodo al final de la lista. */
void altaTurno() {
    if (cantidadPacientes == 0) {
        cout << "No hay pacientes registrados. Alta de turno imposible.\n";
        return;
    }
    if (cantidadEspecialidades == 0) {
        cout << "No hay especialidades registradas. Alta de turno imposible.\n";
        return;
    }

    TurnoNodo *nuevo = new TurnoNodo();
    nuevo->codigo = proximoCodigoTurno;
    proximoCodigoTurno = proximoCodigoTurno + 1;
    nuevo->siguiente = NULL;
    nuevo->estado = ESTADO_ACTIVO;

    cout << "Alta de turno\n";
    char buffer[10];

    cout << "DNI del paciente: ";
    cin.getline(nuevo->pacienteDNI, 15);
    if (esVacio(nuevo->pacienteDNI)) {
        cout << "DNI obligatorio. Alta abortada.\n";
        delete nuevo;
        return;
    }
    int idxPac;
    if (!buscarPacientePorDNI(nuevo->pacienteDNI, idxPac)) {
        cout << "Paciente no registrado. Alta abortada.\n";
        delete nuevo;
        return;
    }

    cout << "Codigo de especialidad: ";
    cin.getline(buffer, 10);
    int codEsp = atoi(buffer);
    int idxEsp;
    if (!buscarEspecialidadPorCodigo(codEsp, idxEsp)) {
        cout << "Especialidad no encontrada. Alta abortada.\n";
        delete nuevo;
        return;
    }
    nuevo->codigoEspecialidad = codEsp;

    /* evitar carga duplicada paciente+especialidad (activo) */
    if (existeTurnoActivoPacienteEspecial(nuevo->pacienteDNI, nuevo->codigoEspecialidad)) {
        cout << "El paciente ya tiene un turno activo para esa especialidad. Alta abortada.\n";
        delete nuevo;
        return;
    }

    /* Leer fecha y hora como enteros */
    cout << "Fecha - dia: ";
    cin.getline(buffer, 10); nuevo->dia = atoi(buffer);
    cout << "Fecha - mes: ";
    cin.getline(buffer, 10); nuevo->mes = atoi(buffer);
    cout << "Fecha - anio: ";
    cin.getline(buffer, 10); nuevo->anio = atoi(buffer);
    cout << "Hora (0-23): ";
    cin.getline(buffer, 10); nuevo->hora = atoi(buffer);
    cout << "Minuto (0-59): ";
    cin.getline(buffer, 10); nuevo->minuto = atoi(buffer);

    /* validar fecha y hora sencillos (checks basicos) */
    if (nuevo->dia < 1 || nuevo->dia > 31 || nuevo->mes < 1 || nuevo->mes > 12 || nuevo->anio < 1900 ||
        nuevo->hora < 0 || nuevo->hora > 23 || nuevo->minuto < 0 || nuevo->minuto > 59) {
        cout << "Fecha u hora invalida. Alta abortada.\n";
        delete nuevo;
        return;
    }

    /* Insertar al final de la lista enlazada */
    if (cabezaTurnos == NULL) {
        cabezaTurnos = nuevo;
    } else {
        TurnoNodo *actual = cabezaTurnos;
        while (actual->siguiente != NULL) {
            actual = actual->siguiente;
        }
        actual->siguiente = nuevo;
    }

    cout << "Turno creado. Codigo: " << nuevo->codigo << "\n";
}

/* Modificar turno: busca por codigo y permite cambiar fecha/hora (no cambia paciente ni especialidad) */
void modificacionTurno() {
    char buffer[10];
    cout << "Modificacion de turno - Ingrese codigo de turno: ";
    cin.getline(buffer, 10);
    int codigo = atoi(buffer);
    TurnoNodo *turno = buscarTurnoPorCodigo(codigo);
    if (turno == NULL) {
        cout << "Turno no encontrado.\n";
        return;
    }
    if (turno->estado != ESTADO_ACTIVO) {
        cout << "Solo se pueden modificar turnos activos.\n";
        return;
    }

    cout << "Ingrese nueva fecha y hora:\n";
    cout << "Dia: "; cin.getline(buffer, 10); turno->dia = atoi(buffer);
    cout << "Mes: "; cin.getline(buffer, 10); turno->mes = atoi(buffer);
    cout << "Anio: "; cin.getline(buffer, 10); turno->anio = atoi(buffer);
    cout << "Hora: "; cin.getline(buffer, 10); turno->hora = atoi(buffer);
    cout << "Minuto: "; cin.getline(buffer, 10); turno->minuto = atoi(buffer);

    /* Validacion basica */
    if (turno->dia < 1 || turno->dia > 31 || turno->mes < 1 || turno->mes > 12 || turno->anio < 1900 ||
        turno->hora < 0 || turno->hora > 23 || turno->minuto < 0 || turno->minuto > 59) {
        cout << "Fecha/hora invalida. No se modifico.\n";
        return;
    }
    cout << "Turno modificado correctamente.\n";
}

/* Cancelacion de turno con regla de 48 horas: si falta menos de 48h no se permite la cancelacion.
   Compara minutos de la fecha del turno con minutos actuales usando convertirFechaHoraAMinutos.
*/
void cancelacionTurno() {
    char buffer[10];
    cout << "Cancelacion de turno - Ingrese codigo de turno: ";
    cin.getline(buffer, 10);
    int codigo = atoi(buffer);
    TurnoNodo *turno = buscarTurnoPorCodigo(codigo);
    if (turno == NULL) {
        cout << "Turno no encontrado.\n";
        return;
    }
    if (turno->estado != ESTADO_ACTIVO) {
        cout << "El turno ya esta cancelado.\n";
        return;
    }

    long minutosTurno = convertirFechaHoraAMinutos(turno->dia, turno->mes, turno->anio, turno->hora, turno->minuto);
    if (minutosTurno == -1) {
        cout << "Error al interpretar fecha/hora del turno. Cancelacion no realizada.\n";
        return;
    }

    long minutosAhora = minutosActuales();
    long diferenciaMinutos = minutosTurno - minutosAhora;

    if (diferenciaMinutos < (48L * 60L)) { /* menos de 48 horas */
        cout << "No se puede cancelar el turno: falta menos de 48 horas.\n";
        return;
    }

    /* Marcar cancelado */
    turno->estado = ESTADO_CANCELADO;
    cout << "Turno cancelado correctamente.\n";
}

/* Listado completo de turnos (muestra todos o filtra por estado) */
void listadoTurnosCompleto() {
    if (cabezaTurnos == NULL) {
        cout << "No hay turnos registrados.\n";
        return;
    }
    TurnoNodo *actual = cabezaTurnos;
    cout << "Listado de turnos:\n";
    while (actual != NULL) {
        cout << "Codigo: " << actual->codigo
             << " | Fecha: " << actual->dia << "/" << actual->mes << "/" << actual->anio
             << " | Hora: " << actual->hora << ":" << (actual->minuto < 10 ? "0" : "") << actual->minuto
             << " | DNI paciente: " << actual->pacienteDNI
             << " | Especialidad: " << actual->codigoEspecialidad
             << " | Estado: " << (actual->estado == ESTADO_ACTIVO ? "ACTIVO" : "CANCELADO") << "\n";
        actual = actual->siguiente;
    }
}

/* Búsqueda de turnos por filtros simples (por paciente DNI, por fecha o por especialidad) */
void buscarTurnosPorFiltro() {
    cout << "Opciones de busqueda:\n";
    cout << "1) Por DNI de paciente\n";
    cout << "2) Por fecha (dia,mes,anio)\n";
    cout << "3) Por codigo de especialidad\n";
    cout << "Elija opcion (1-3): ";
    char opcion[4];
    cin.getline(opcion, 4);
    if (strcmp(opcion, "1") == 0) {
        char dni[15];
        cout << "Ingrese DNI: ";
        cin.getline(dni, 15);
        TurnoNodo *actual = cabezaTurnos;
        bool hubo = false;
        while (actual != NULL) {
            if (strcmp(actual->pacienteDNI, dni) == 0) {
                cout << "Codigo: " << actual->codigo << " Fecha: " << actual->dia << "/" << actual->mes << "/" << actual->anio
                     << " Hora: " << actual->hora << ":" << (actual->minuto < 10 ? "0" : "") << actual->minuto
                     << " Estado: " << (actual->estado == ESTADO_ACTIVO ? "ACTIVO" : "CANCELADO") << "\n";
                hubo = true;
            }
            actual = actual->siguiente;
        }
        if (!hubo) cout << "No se encontraron turnos para ese DNI.\n";
    } else if (strcmp(opcion, "2") == 0) {
        char buffer[10];
        int dia, mes, anio;
        cout << "Dia: "; cin.getline(buffer, 10); dia = atoi(buffer);
        cout << "Mes: "; cin.getline(buffer, 10); mes = atoi(buffer);
        cout << "Anio: "; cin.getline(buffer, 10); anio = atoi(buffer);
        TurnoNodo *actual = cabezaTurnos;
        bool hubo = false;
        while (actual != NULL) {
            if (actual->dia == dia && actual->mes == mes && actual->anio == anio) {
                cout << "Codigo: " << actual->codigo << " Hora: " << actual->hora << ":" << (actual->minuto < 10 ? "0" : "") << actual->minuto
                     << " DNI: " << actual->pacienteDNI << " Estado: " << (actual->estado == ESTADO_ACTIVO ? "ACTIVO" : "CANCELADO") << "\n";
                hubo = true;
            }
            actual = actual->siguiente;
        }
        if (!hubo) cout << "No hay turnos en esa fecha.\n";
    } else if (strcmp(opcion, "3") == 0) {
        char buffer[10];
        cout << "Codigo de especialidad: ";
        cin.getline(buffer, 10);
        int codigo = atoi(buffer);
        TurnoNodo *actual = cabezaTurnos;
        bool hubo = false;
        while (actual != NULL) {
            if (actual->codigoEspecialidad == codigo) {
                cout << "Codigo: " << actual->codigo << " Fecha: " << actual->dia << "/" << actual->mes << "/" << actual->anio
                     << " Hora: " << actual->hora << ":" << (actual->minuto < 10 ? "0" : "") << actual->minuto
                     << " DNI: " << actual->pacienteDNI << " Estado: " << (actual->estado == ESTADO_ACTIVO ? "ACTIVO" : "CANCELADO") << "\n";
                hubo = true;
            }
            actual = actual->siguiente;
        }
        if (!hubo) cout << "No se encontraron turnos para esa especialidad.\n";
    } else {
        cout << "Opcion invalida.\n";
    }
}

/* ------- MENUS (estructura completa, sin atajos) ------- */

void menuPacientes() {
    while (true) {
        cout << "\n--- Menu Pacientes ---\n";
        cout << "1) Alta de paciente\n";
        cout << "2) Modificacion de paciente\n";
        cout << "3) Baja de paciente\n";
        cout << "4) Listado completo\n";
        cout << "5) Buscar por DNI\n";
        cout << "6) Volver\n";
        cout << "Elija opcion (1-6): ";
        char opcion[4];
        cin.getline(opcion, 4);
        if (strcmp(opcion, "1") == 0) {
            altaPaciente();
        } else if (strcmp(opcion, "2") == 0) {
            modificacionPaciente();
        } else if (strcmp(opcion, "3") == 0) {
            bajaPaciente();
        } else if (strcmp(opcion, "4") == 0) {
            listadoPacientesCompleto();
        } else if (strcmp(opcion, "5") == 0) {
            buscarPaciente();
        } else if (strcmp(opcion, "6") == 0) {
            break;
        } else {
            cout << "Opcion invalida. Reintente.\n";
        }
    }
}

void menuEspecialidades() {
    while (true) {
        cout << "\n--- Menu Especialidades ---\n";
        cout << "1) Alta de especialidad\n";
        cout << "2) Modificacion\n";
        cout << "3) Baja\n";
        cout << "4) Listado completo\n";
        cout << "5) Buscar por codigo\n";
        cout << "6) Volver\n";
        cout << "Elija opcion (1-6): ";
        char opcion[4];
        cin.getline(opcion, 4);
        if (strcmp(opcion, "1") == 0) {
            altaEspecialidad();
        } else if (strcmp(opcion, "2") == 0) {
            modificacionEspecialidad();
        } else if (strcmp(opcion, "3") == 0) {
            bajaEspecialidad();
        } else if (strcmp(opcion, "4") == 0) {
            listadoEspecialidadesCompleto();
        } else if (strcmp(opcion, "5") == 0) {
            buscarEspecialidad();
        } else if (strcmp(opcion, "6") == 0) {
            break;
        } else {
            cout << "Opcion invalida. Reintente.\n";
        }
    }
}

void menuTurnos() {
    while (true) {
        cout << "\n--- Menu Turnos ---\n";
        cout << "1) Alta de turno\n";
        cout << "2) Modificacion de turno\n";
        cout << "3) Cancelacion de turno\n";
        cout << "4) Listado completo\n";
        cout << "5) Buscar por filtro\n";
        cout << "6) Volver\n";
        cout << "Elija opcion (1-6): ";
        char opcion[4];
        cin.getline(opcion, 4);
        if (strcmp(opcion, "1") == 0) {
            altaTurno();
        } else if (strcmp(opcion, "2") == 0) {
            modificacionTurno();
        } else if (strcmp(opcion, "3") == 0) {
            cancelacionTurno();
        } else if (strcmp(opcion, "4") == 0) {
            listadoTurnosCompleto();
        } else if (strcmp(opcion, "5") == 0) {
            buscarTurnosPorFiltro();
        } else if (strcmp(opcion, "6") == 0) {
            break;
        } else {
            cout << "Opcion invalida. Reintente.\n";
        }
    }
}

int menuPrincipal() {
    int opcion = 0;

    do
    {
        cout << "MENU PRINCIPAL" << endl;
        cout << "1. Administrar Especialidades Medicas" << endl;
        cout << "2. Administrar Pacientes" << endl;
        cout << "3. Administrar Turnos" << endl;
        cout << "4. Salir" << endl;
        cout << "Ingrese una opcion: ";
        cin >> opcion;
        cin.ignore(); // Limpia salto de línea

        system("cls");

        switch (opcion)
        {
            case 1:
                menuEspecialidades();
                break;

            case 2:
                menuPacientes();
                break;

            case 3:
                menuTurnos();
                break;

            case 4:
                cout << "Saliendo del sistema..." << endl;
                return 0;

            default:
                cout << "Numero incorrecto. Intente nuevamente." << endl;
                break;
        }

    } while (opcion != 4);
    
    return 0;
}

//* ------- FUNCION MAIN ------- */

int main() {
    cout << "Iniciando Sistema Medico...\n";
    menuPrincipal();

    /* Antes de terminar liberar memoria de lista de turnos */
    TurnoNodo *actual = cabezaTurnos;
    while (actual != NULL) {
        TurnoNodo *prox = actual->siguiente;
        delete actual;
        actual = prox;
    }
    cabezaTurnos = NULL;
    return 0;
}