<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="PropietariosIn.aspx.cs" Inherits="CapaPresentacion.PropietariosIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-12">
            <ul class="nav nav-pills flex-column flex-md-row mb-3">
                <li class="nav-item">
                    <a class="nav-link active" href="javascript:void(0);"><i class="bx bx-user me-1"></i>Registro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="ListaPropietariosIn.aspx"><i class="bx bx-menu me-1"></i>Lista de Propietarios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="bx bx-link-alt me-1"></i>Consultas</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="row">
    <div class="col-lg-7">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center" style="padding: 10px 20px 10px 20px;">
                <h5 class="mb-0">Registrar Propietarios</h5>
                <button type="button" id="btnGuardarPropie" class="btn btn-sm rounded-pill btn-success">Guardar</button>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="mb-3 col-md-4">
                        <label for="txtNombres" class="form-label">Nombres:</label>
                        <input class="form-control form-control-sm" type="text" id="txtNombres" name="Nombres"
                            autofocus />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label for="txtApellidos" class="form-label">Apellidos:</label>
                        <input class="form-control form-control-sm" type="text" id="txtApellidos" name="Apellidos" />
                    </div>
                    <div class="mb-3 col-md-4">
                        <label for="txtCi" class="form-label">Nro CI:</label>
                        <input class="form-control form-control-sm" type="text" id="txtCi" name="Nro ci" />
                    </div>
                    <div class="col-md-4">
                        <label for="txtDireccion" class="form-label">Direccion:</label>
                        <input type="text" class="form-control form-control-sm" id="txtDireccion" name="Direccion" />
                    </div>
                    <div class="col-md-4">
                        <label for="txtCelular" class="form-label">Celular</label>
                        <input class="form-control form-control-sm" type="text" id="txtCelular" name="Celular" />
                    </div>
                    <div class="col-md-4">
                        <label class="form-label" for="cboEstado">Estado</label>
                        <select id="cboEstado" class="form-select form-select-sm">
                            <option value="">Select</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Secretaria">Secretaria</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-5">
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            This is a wider card with supporting text belo
                        </p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div class="col-md-4">
                    <img class="card-img card-img-right" src="assets/img/elements/17.jpg" alt="Card image" />
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
