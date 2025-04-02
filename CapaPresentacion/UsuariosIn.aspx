<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="UsuariosIn.aspx.cs" Inherits="CapaPresentacion.UsuariosIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <div class="row">
    <div class="col-md-12">
        <ul class="nav nav-pills flex-column flex-md-row mb-3">
            <li class="nav-item">
                <a class="nav-link active" href="javascript:void(0);"><i class="bx bx-user me-1"></i> Registro de Usuario</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="ListaUsuariosIn.aspx"><i class="bx bx-menu me-1"></i> Lista de Usuarios</a>
            </li>
        </ul>
        <div class="card mb-4">
            <h5 class="card-header">Registro de Usuario</h5>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="txtNombres" class="form-label">Nombres</label>
                                <input class="form-control form-control-sm" type="text" id="txtNombres" name="Nombres"
                                    autofocus />
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="txtApellidos" class="form-label">Apellidos</label>
                                <input class="form-control form-control-sm" type="text" name="Apellidos" id="txtApellidos" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="txtCorreo" class="form-label">Correo</label>
                                <input class="form-control form-control-sm" type="text" id="txtCorreo" name="Correo"
                                    placeholder="correo@example.com" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="txtContrasena" class="form-label">Contraseña</label>
                                <input type="text" class="form-control form-control-sm" id="txtContrasena"
                                    name="Contraseña" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="row">
                            <div class="mb-3 col-md-4">
                                <label for="txtCelular" class="form-label">Celular</label>
                                <input class="form-control form-control-sm" type="text" id="txtCelular" name="Celular"
                                    placeholder="Celular" />
                            </div>
                            <div class="mb-3 col-md-4">
                                <label class="form-label" for="cboRol">Rol</label>
                                <select id="cboRol" class="form-select form-select-sm">
                                    <option value="">Select</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Secretaria">Secretaria</option>
                                </select>
                            </div>
                            <div class="mb-3 col-md-4">
                                <label for="cboInmobiliaria" class="form-label">Inmobiliaria</label>
                                <select id="cboInmobiliaria" class="form-select form-select-sm">
                                    <option value="">Select</option>
                                    <option value="en">La casa feliz</option>
                                    <option value="fr">Grupo Zion</option>
                                </select>
                            </div>
                        </div>
                        <%--<h5>Basic Layout</h5>--%>
                        <div class="d-flex align-items-start align-items-sm-center gap-4">
                            <img src="assets/img/avatars/1.png" alt="user-avatar" class="d-block rounded" height="100" width="100"
                                id="imgUsuarioReg" />
                            <div class="button-wrapper">
                                <div class="me-2 mb-0">
                                    <label for="txtFotoUr" class="form-label">Seleccione foto</label>
                                    <input class="form-control" type="file" id="txtFotoUr">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="mt-2">
                    <button type="button" class="btn btn-sm btn-primary me-2">Guardar</button>
                    <button type="button" id="btnmodl" class="btn btn-sm btn-outline-secondary">Cancelar Modal</button>
                </div>
            </div>
        </div>
    </div>
</div>

    <%--<div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-body">
                    <div class="demo-inline-spacing">
                        <button type="button" id="btnmodl" class="btn btn-primary">Ver modal</button>
                        <button type="button" class="btn btn-secondary">Opciones</button>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>


    <div class="modal fade" id="largeModal" tabindex="-1" aria-hidden="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel3">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col mb-3">
                        <label for="nameLarge" class="form-label">Name</label>
                        <input type="text" id="nameLarge" class="form-control" placeholder="Enter Name" />
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col mb-0">
                        <label for="emailLarge" class="form-label">Email</label>
                        <input type="text" id="emailLarge" class="form-control" placeholder="xxxx@xxx.xx" />
                    </div>
                    <div class="col mb-0">
                        <label for="dobLarge" class="form-label">DOB</label>
                        <input type="text" id="dobLarge" class="form-control" placeholder="DD / MM / YY" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close
                </button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/UsuariosIn.js" type="text/javascript"></script>
</asp:Content>
