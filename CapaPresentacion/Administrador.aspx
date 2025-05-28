<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Administrador.aspx.cs" Inherits="CapaPresentacion.Administrador" %>

<!DOCTYPE html>

<html
  lang="en"
  class="light-style layout-menu-fixed"
  dir="ltr"
  data-theme="theme-default"
  data-assets-path="assets/"
  data-template="vertical-menu-template-free"
>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
    />

    <title>Sistema Integrado</title>

    <meta name="description" content="Inmobiliarias" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/img/favicon/favicon.ico" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
      rel="stylesheet"
    />

    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.datatables.net/2.2.2/css/dataTables.bootstrap5.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.datatables.net/responsive/3.0.4/css/responsive.bootstrap5.css" rel="stylesheet" type="text/css" />

    <!-- Icons. Uncomment required icon fonts -->
    <link rel="stylesheet" href="assets/vendor/fonts/boxicons.css" />

    <!-- Core CSS -->
    <link rel="stylesheet" href="assets/vendor/css/core.css" class="template-customizer-core-css" />
    <link rel="stylesheet" href="assets/vendor/css/theme-default.css" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="assets/css/demo.css" />

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
    <link rel="stylesheet" href="assets/css/carzero.css" />

    <!-- Page CSS -->
     <script async defer src="https://buttons.github.io/buttons.js"></script>
    <!-- Helpers -->
    <script src="assets/vendor/js/helpers.js"></script>

    <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
    <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
    <script src="assets/js/config.js"></script>
  </head>

<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->

            <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
                <div class="app-brand demo">
                    <a href="Administrador.aspx" class="app-brand-link">
                        <span class="app-brand-logo demo">
                            <img id="fotoriAd" src="Imagenes/logochoca.png" alt="" style="height: 40px; max-width: 40px;" />
                        </span>
                        <span class="app-brand-text demo menu-text fw-bolder ms-2">-ARL-</span>
                    </a>

                    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i class="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div class="menu-inner-shadow"></div>

                <ul class="menu-inner py-1">
                    <!-- Dashboard -->
                    <li class="menu-item">
                        <a href="Administrador.aspx" class="menu-link">
                            <i class="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Administracion</div>
                        </a>
                    </li>
                </ul>
            </aside>
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->

                <nav
                    class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                    id="layout-navbar">
                    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                            <i class="bx bx-menu bx-sm"></i>
                        </a>
                    </div>

                    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                        <!-- Search -->
                        <div class="navbar-nav align-items-center">
                            <div class="nav-item d-flex align-items-center">
                                <i class="bx bx-search fs-4 lh-0"></i>
                                <input
                                    type="text"
                                    class="form-control border-0 shadow-none"
                                    placeholder="Buscar..."
                                    aria-label="Search..." />
                            </div>
                        </div>
                        <!-- /Search -->

                        <ul class="navbar-nav flex-row align-items-center ms-auto">
                            <!-- Place this tag where you want the button to render. -->


                            <!-- User -->
                            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                                <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                                    <div class="avatar avatar-online">
                                        <img id="fotoUsuariAd" src="Imagenes/logochoca.png" alt="" class="w-px-40 h-auto rounded-circle" />
                                    </div>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 me-3">
                                                    <div class="avatar avatar-online">
                                                        <img id="fotoUsdosAd" src="Imagenes/logochoca.png" alt="" class="w-px-40 h-auto rounded-circle" />
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <span id="lblApeUsuAd" class="fw-semibold d-block">John Doe</span>
                                                    <small id="lblRolusAd" class="text-muted">Admin</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <i class="bx bx-user me-2"></i>
                                            <span class="align-middle">Mi Perfil</span>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" id="salirSisAd" href="#">
                                            <i class="bx bx-power-off me-2"></i>
                                            <span class="align-middle">Salir</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <!--/ User -->
                        </ul>
                    </div>
                </nav>

                <!-- / Navbar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->

                    <div class="container-xxl flex-grow-1 container-p-y">
                        <form id="form1" runat="server">

                            <div class="row">
                                <div class="col-lg-8 mb-4 order-0">
                                    <div class="card">
                                        <div class="d-flex align-items-end row">
                                            <div class="col-sm-7">
                                                <div class="card-body">
                                                    <h5 class="card-title text-primary">Bienvenido Administrador 🎉</h5>
                                                    <p class="mb-4">
                                                        Sistema Inmobiliario <span class="fw-bold">ARL</span> Administracion de usuarios e
                                                        Inmobiliarias
                                                    </p>

                                                </div>
                                            </div>
                                            <div class="col-sm-5 text-center text-sm-left">
                                                <div class="card-body pb-0 px-0 px-md-4">
                                                    <img src="assets/img/illustrations/man-with-laptop-light.png" height="120"
                                                        alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                                        data-app-light-img="illustrations/man-with-laptop-light.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 order-1">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-12 col-6 mb-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="card-title d-flex align-items-start justify-content-between">
                                                        <div class="avatar flex-shrink-0">
                                                            <img src="assets/img/icons/unicons/chart-success.png" alt="chart success"
                                                                class="rounded" />
                                                        </div>
                                                        <div class="dropdown">
                                                            <button class="btn p-0" type="button" id="cardOpt3" data-bs-toggle="dropdown"
                                                                aria-haspopup="true" aria-expanded="false">
                                                                <i class="bx bx-dots-vertical-rounded"></i>
                                                            </button>
                                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                                <a class="dropdown-item" href="javascript:void(0);">View More</a>
                                                                <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span class="fw-semibold d-block">Usuarios</span>
                                                    <h3 class="card-title" style="font-size: 18px; margin-bottom: 0">5 Reg</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12 col-6 mb-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="card-title d-flex align-items-start justify-content-between">
                                                        <div class="avatar flex-shrink-0">
                                                            <img src="assets/img/icons/unicons/wallet-info.png" alt="Credit Card"
                                                                class="rounded" />
                                                        </div>
                                                        <div class="dropdown">
                                                            <button class="btn p-0" type="button" id="cardOpt6" data-bs-toggle="dropdown"
                                                                aria-haspopup="true" aria-expanded="false">
                                                                <i class="bx bx-dots-vertical-rounded"></i>
                                                            </button>
                                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                                                <a class="dropdown-item" href="javascript:void(0);">View More</a>
                                                                <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span class="fw-semibold d-block">Inmobiliarias</span>
                                                    <h3 class="card-title text-nowrap" style="font-size: 18px; margin-bottom: 0">4 Reg</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">

                                <div class="col-xl-12">
                                    <h6 class="text-muted">Administracion del Sistema Integrado</h6>
                                    <div class="nav-align-top mb-4">
                                        <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link active"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-pills-justified-home"
                                                    aria-controls="navs-pills-justified-home"
                                                    aria-selected="true">
                                                    <i class="tf-icons bx bx-home"></i>Inmobiliarias
                                                </button>
                                            </li>
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-pills-justified-profile"
                                                    aria-controls="navs-pills-justified-profile"
                                                    aria-selected="false">
                                                    <i class="tf-icons bx bx-user"></i>Usuarios
                                                </button>
                                            </li>
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-pills-justified-messages"
                                                    aria-controls="navs-pills-justified-messages"
                                                    aria-selected="false">
                                                    <i class="tf-icons bx bx-cog"></i>Configuracion
                                                </button>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="cloader">
                                            <div class="tab-pane fade show active" id="navs-pills-justified-home" role="tabpanel">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h5 class="pb-1">Inmobiliarias Registradas</h5>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <button type="button" id="btnAddNuevoInm" class="btn btn-success btn-sm me-3">
                                                            <i class="bx bx-building-house me-1"></i>Nuevo registro
                                                        </button>
                                                        <button type="button" id="btnReporteIn" class="btn btn-primary btn-sm">
                                                            <i class="bx bx-printer me-1"></i>Reporte
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="row gx-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-start mt-2"
                                                    id="listarInmm">
                                                </div>

                                            </div>
                                            <div class="tab-pane fade" id="navs-pills-justified-profile" role="tabpanel">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h5 class="pb-1">Usuarios Registradas</h5>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <button type="button" id="btnAddNuevoUsuari" class="btn btn-success btn-sm me-3">
                                                            <i class="bx bx-user me-1"></i>Nuevo registro
                                                        </button>
                                                        <button type="button" id="btnReporteusuar" class="btn btn-primary btn-sm">
                                                            <i class="bx bx-printer me-1"></i>Reporte
                                                        </button>
                                                    </div>
                                                </div>

                                                <div class="row mt-2">
                                                    <div class="col-lg-12 mb-0">
                                                        <table id="exampleu" class="table table-striped nowrap" style="width: 100%">
                                                            <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Foto</th>
                                                                    <th>Nombres</th>
                                                                    <th>Correo</th>
                                                                    <%--<th>Rol</th>--%>
                                                                    <th>Celular</th>
                                                                    <th>Inmobiliaria</th>
                                                                    <th>Estado</th>
                                                                    <th>Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="navs-pills-justified-messages" role="tabpanel">
                                                <p class="mb-0">
                                                    Cake chocolate bar cotton
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal inmobiliaria -->
                            <div class="modal fade" id="modalInmobR" tabindex="-1" aria-hidden="false">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel3">Registrar Inmobiliaria</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" id="loaddddd">
                                            <input id="txtIdInmobi" name="IdInmobiliaria" value="0" type="hidden" />
                                            <div class="row g-2">
                                                <div class="col mb-3">
                                                    <label for="txtNombreIn" class="form-label">Inmobiliaria</label>
                                                    <input type="text" id="txtNombreIn" name="Inmobiliaria" class="form-control form-control-sm modelval" />
                                                </div>
                                                <div class="col mb-3">
                                                    <label for="txtPropietario" class="form-label">Propietario</label>
                                                    <input type="text" id="txtPropietario" class="form-control form-control-sm modelval" name="Propietario" />
                                                </div>
                                            </div>
                                            <div class="row g-2">
                                                <div class="col mb-3">
                                                    <label for="txtCorreoIn" class="form-label">Correo</label>
                                                    <input class="form-control form-control-sm modelval" type="text" id="txtCorreoIn" name="Correo" />
                                                </div>
                                                <div class="col mb-3">
                                                    <label for="txtCelular" class="form-label">Celular</label>
                                                    <input class="form-control form-control-sm modelval" type="text" id="txtCelular" name="Celular" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col mb-0">
                                                    <label for="txtDireccion" class="form-label">Direccion</label>
                                                    <input type="text" class="form-control form-control-sm modelval" id="txtDireccion" name="Direccion" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                Cerrar
                                            </button>
                                            <button type="button" id="btnGuardarRin" class="btn btn-primary">Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <!-- Modal usuarios -->
                            <div class="modal fade" id="modalUsuarios" tabindex="-1" aria-hidden="false">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="modalLabesUsua">Registro de Usuario</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" id="cargand">
                                            <input id="txtIdUsuario" name="IdUsuario" value="0" type="hidden" />
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <div class="mb-3 col-md-6">
                                                            <label for="txtNombres" class="form-label">Nombres</label>
                                                            <input class="form-control form-control-sm modelvalUsu" type="text" id="txtNombres"
                                                                name="Nombres" />
                                                        </div>
                                                        <div class="mb-3 col-md-6">
                                                            <label for="txtApellidos" class="form-label">Apellidos</label>
                                                            <input class="form-control form-control-sm modelvalUsu" type="text" name="Apellidos"
                                                                id="txtApellidos" />
                                                        </div>
                                                        <div class="mb-3 col-md-6">
                                                            <label for="txtCorreo" class="form-label">Correo</label>
                                                            <input class="form-control form-control-sm modelvalUsu" type="text" id="txtCorreo"
                                                                name="Correo" placeholder="correo@example.com" />
                                                        </div>
                                                        <div class="mb-3 col-md-6">
                                                            <label for="txtContrasena" class="form-label">Contraseña</label>
                                                            <input type="text" class="form-control form-control-sm modelvalUsu" id="txtContrasena"
                                                                name="Contraseña" />
                                                        </div>
                                                        <div class="mb-3 col-md-6">
                                                            <label for="txtCelularUsu" class="form-label">Celular</label>
                                                            <input class="form-control form-control-sm modelvalUsu" type="text" id="txtCelularUsu"
                                                                name="Celular" placeholder="Celular" />
                                                        </div>
                                                        <div class="mb-3 col-md-6">
                                                            <label for="cboEstado" class="form-label">Estado</label>
                                                            <select class="form-select form-select-sm" id="cboEstado">
                                                                <option value="1">Activo</option>
                                                                <option value="0">No Activo</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <div class="mb-3 col-md-6">
                                                            <label class="form-label" for="cboRol">Rol</label>
                                                            <select id="cboRol" class="form-select form-select-sm">
                                                            </select>
                                                        </div>
                                                        <div class="mb-3 col-md-6">
                                                            <label for="cboInmobiliaria" class="form-label">Inmobiliaria</label>
                                                            <select id="cboInmobiliaria" class="form-select form-select-sm">
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-start align-items-sm-center gap-4">
                                                        <img src="Imagenes/sinimg.png" alt="user-avatar" class="d-block rounded" height="100" width="100"
                                                            id="imgUsuarioReg" />
                                                        <div class="button-wrapper">
                                                            <label for="txtFotoUr" class="btn btn-primary me-2 mb-2" tabindex="0">
                                                                <span class="d-none d-sm-block">Seleccione Foto</span>
                                                                <i class="bx bx-upload d-block d-sm-none"></i>
                                                                <input
                                                                    type="file"
                                                                    id="txtFotoUr"
                                                                    class="account-file-input"
                                                                    hidden
                                                                    accept="image/png, image/jpeg" />
                                                            </label>

                                                            <p class="text-muted mb-0">Imagenes JPG o PNG. Max 1.5 Mb</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                Cerrar
                                            </button>
                                            <button type="button" id="btnRegistrarUs" class="btn btn-primary">Guardar Cambios</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>


                        <!-- Pills -->
                    </div>
                    <!-- / Content -->

                    <!-- Footer -->
                    <footer class="content-footer footer bg-footer-theme">
                        <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                            <div class="mb-2 mb-md-0">
                                ©
                  <script>
                      document.write(new Date().getFullYear());
                  </script>
                                , made with ❤️ by
                  <a href="https://themeselection.com" target="_blank" class="footer-link fw-bolder">EMI</a>
                            </div>
                            <div>
                                <a href="https://themeselection.com/license/" class="footer-link me-4" target="_blank">License</a>
                                <a href="https://themeselection.com/" target="_blank" class="footer-link me-4">Mas</a>

                                <a
                                    href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                                    target="_blank"
                                    class="footer-link me-4">Documentation</a>

                                <a
                                    href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                                    target="_blank"
                                    class="footer-link me-4">Support</a>
                            </div>
                        </div>
                    </footer>
                    <!-- / Footer -->

                    <div class="content-backdrop fade"></div>
                </div>
                <!-- Content wrapper -->
            </div>
            <!-- / Layout page -->
        </div>

        <!-- Overlay -->
        <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    <!-- / Layout wrapper -->

    <!-- <div class="buy-now">
      <a
        href="https://themeselection.com/products/sneat-bootstrap-html-admin-template/"
        target="_blank"
        class="btn btn-danger btn-buy-now"
        >Upgrade to Pro</a
      >
    </div> -->

    <!-- Core JS -->
    <!-- build:js assets/vendor/js/core.js -->
    <script src="assets/vendor/libs/jquery/jquery.js"></script>
    <script src="assets/vendor/libs/popper/popper.js"></script>
    <!-- <script src="../assets/vendor/js/bootstrap.js"></script> -->
    <script src="assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

    <script src="assets/vendor/js/menu.js"></script>
    <!-- Main JS -->
    <script src="assets/js/main.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.bootstrap5.js"></script>
    <script src="https://cdn.datatables.net/responsive/3.0.4/js/dataTables.responsive.js"></script>
    <script src="https://cdn.datatables.net/responsive/3.0.4/js/responsive.bootstrap5.js"></script>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="assets/plugin/loadingoverlay/loadingoverlay.js"></script>
    <script src="js/Administrador.js" type="text/javascript"></script>

    <!-- Page JS -->

    <!-- Place this tag in your head or just before your close body tag. -->
    <!-- <script async defer src="https://buttons.github.io/buttons.js"></script> -->
</body>
</html>
