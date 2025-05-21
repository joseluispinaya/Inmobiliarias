<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="ListaPropietariosIn.aspx.cs" Inherits="CapaPresentacion.ListaPropietariosIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-md-12">
        <ul class="nav nav-pills flex-column flex-md-row mb-3">
            <li class="nav-item">
                <a class="nav-link active" href="javascript:void(0);"><i class="bx bx-menu me-1"></i> Lista Propietarios</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="PropietariosIn.aspx"><i class="bx bx-user me-1"></i> Nuevo Registro</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="javascript:void(0);"><i class="bx bx-search-alt-2 me-1"></i> Consultas</a>
            </li>
        </ul>
        <div class="row">
            <div class="col-lg-12">
                <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Propietarios Registrados</h5>
                        <small class="text-muted float-end">Lista</small>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <table id="tbPropietar" class="table table-striped nowrap" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nro CI</th>
                                            <th>Nombre</th>
                                            <th>Celular</th>
                                            <th>Registrado</th>
                                            <th>Estado</th>
                                            <th>Nro Prop</th>
                                            <th>Accion</th>
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
</div>

    <div class="modal fade" id="modalPropi" tabindex="-1" aria-hidden="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel3">Editar Propietario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdPropietario" name="IdPropietario" value="0" type="hidden" />
                    <input id="txtIdRol" name="IdRol" value="0" type="hidden" />
                    <input id="txtIdInmobi" name="IdInmobili" value="0" type="hidden" />
                    <div class="row g-2">
                        <div class="col mb-3">
                            <label for="txtNombres" class="form-label">Nombres</label>
                            <input type="text" id="txtNombres" name="Nombres" class="form-control form-control-sm" />
                        </div>
                        <div class="col mb-3">
                            <label for="txtApellidos" class="form-label">Apellidos</label>
                            <input type="text" id="txtApellidos" class="form-control form-control-sm" name="Apellidos" />
                        </div>
                    </div>
                    <div class="row g-2">
                        <div class="col mb-3">
                            <label for="txtCi" class="form-label">Nro CI</label>
                            <input class="form-control form-control-sm" type="text" id="txtCi" name="Nro ci" />
                        </div>
                        <div class="col mb-3">
                            <label for="txtCelular" class="form-label">Celular</label>
                            <input class="form-control form-control-sm" type="text" id="txtCelular" name="Celular" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-0">
                            <label for="txtDireccion" class="form-label">Direccion</label>
                            <input type="text" class="form-control form-control-sm" id="txtDireccion" name="Direccion" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="button" id="btnguardarCam" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/ListaPropietariosIn.js" type="text/javascript"></script>
</asp:Content>
