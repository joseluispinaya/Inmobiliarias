<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="PanelVisitas.aspx.cs" Inherits="CapaPresentacion.PanelVisitas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugin/calen/fullcalendar.min.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <div class="row">
        <div class="col-12">
            <h6 class="text-muted">Panel de solicitud de Visitas</h6>
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
                            <i class="tf-icons bx bx-home"></i>Calendario
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
                            <i class="tf-icons bx bx-user"></i>Atenciones
                        </button>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="navs-pills-justified-home" role="tabpanel">
                        <div id="calendar"></div>
                    </div>
                    <div class="tab-pane fade" id="navs-pills-justified-profile" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-12">
                                <p>Solicitudes de visitas Atendidas</p>
                                <table id="tbAtenciones" class="table table-striped nowrap" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Codigo</th>
                                            <th>Aceptada</th>
                                            <th>Programado</th>
                                            <th>Estado</th>
                                            <th>Agente</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%--<div class="row">
        <div class="col-md-12">
            <div class="card">
                <h5 class="card-header">Panel de solicitud de Visitas</h5>
                <div class="card-body">
                    <div id="calendar"></div>
                </div>
            </div>
        </div>
    </div>--%>

    <div class="modal fade" id="modaldetall" tabindex="-1" aria-hidden="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel3">Detalle de solicitud</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="loadDeta">
              <input id="txtIdVisi" value="0" type="hidden" />
                <div class="row">
                    <div class="col-sm-8">
                        <p>Detalle de la Propiedad</p>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="d-flex mb-3">
                                    <div class="flex-shrink-0">
                                        <i class="bx bx-dollar me-3" style="font-size: 2rem;"></i>
                                    </div>
                                    <div class="flex-grow-1 row">
                                        <div class="col-12 mb-sm-0 mb-2">
                                            <h6 class="mb-0">Precio</h6>
                                            <small id="lblprcio" class="text-muted"></small>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex mb-3">
                                    <div class="flex-shrink-0">
                                        <i class="bx bx-home me-3" style="font-size: 2rem;"></i>
                                    </div>
                                    <div class="flex-grow-1 row">
                                        <div class="col-12 mb-sm-0 mb-2">
                                            <h6 class="mb-0">Distrito</h6>
                                            <small id="lblDistri" class="text-muted"></small>
                                        </div>
                                    </div>
                                </div>

                                <h6 class="mb-0">Solicitado el</h6>
                                <p id="lblferegi"></p>
                            </div>
                            <div class="col-sm-6">
                                <div class="d-flex mb-3">
                                    <div class="flex-shrink-0">
                                        <i class="bx bx-ruler me-3" style="font-size: 2rem;"></i>
                                    </div>
                                    <div class="flex-grow-1 row">
                                        <div class="col-12 mb-sm-0 mb-2">
                                            <h6 class="mb-0">Dimencion</h6>
                                            <small id="lblSuperf" class="text-muted"></small>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex mb-3">
                                    <div class="flex-shrink-0">
                                        <i class="bx bx-bookmark me-3" style="font-size: 2rem;"></i>
                                    </div>
                                    <div class="flex-grow-1 row">
                                        <div class="col-12 mb-sm-0 mb-2">
                                            <h6 class="mb-0">Tipo</h6>
                                            <small id="lblTipop" class="text-muted"></small>
                                        </div>
                                    </div>
                                </div>
                                <h6 class="mb-0">Direccion</h6>
                                <p id="lblDireccion"></p>
                            </div>
                        </div>
                        <%--<h6 class="mb-0">Direccion</h6>
                        <p id="lblDireccion"></p>--%>

                    </div>
                    <div class="col-sm-4">
                        <p>Detalle del Cliente</p>
                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0">
                                <i class="bx bx-user me-3" style="font-size: 2rem;"></i>
                            </div>
                            <div class="flex-grow-1 row">
                                <div class="col-12 mb-sm-0 mb-2">
                                    <h6 class="mb-0">Nombre</h6>
                                    <small id="lblclientev" class="text-muted"></small>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0">
                                <i class="bx bx-phone-outgoing me-3" style="font-size: 2rem;"></i>
                            </div>
                            <div class="flex-grow-1 row">
                                <div class="col-12 mb-sm-0 mb-2">
                                    <h6 class="mb-0">Celular</h6>
                                    <small id="lblcelucli" class="text-muted"></small>
                                </div>
                            </div>
                        </div>

                        <div class="mt-2">
                            <%--<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>--%>
                            <button type="button" id="btnGuardarCambiosat" class="btn btn-primary">generar atencion</button>
                        </div>

                    </div>
                </div>
            </div>
            <%--<div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" id="btnGuardarCambiosat" class="btn btn-primary">Generar atencion</button>
            </div>--%>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugin/calen/moment.min.js"></script>
    <script src="assets/plugin/calen/fullcalendar.min.js"></script>
    <script src="assets/plugin/calen/es.js"></script>
    <script src="js/PanelVisitas.js" type="text/javascript"></script>
</asp:Content>
