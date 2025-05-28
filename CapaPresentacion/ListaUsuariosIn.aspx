<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="ListaUsuariosIn.aspx.cs" Inherits="CapaPresentacion.ListaUsuariosIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-12">
            <ul class="nav nav-pills flex-column flex-md-row mb-3">
                <li class="nav-item">
                    <a class="nav-link active" href="javascript:void(0);"><i class="bx bx-menu me-1"></i> Usuarios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="UsuariosIn.aspx"><i class="bx bx-user me-1"></i> Nuevo Registro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);"><i class="bx bx-search-alt-2 me-1"></i> Consultas</a>
                </li>
            </ul>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card mb-4">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">Usuarios Registrados</h5>
                            <small class="text-muted float-end">Lista</small>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <table id="exampleu" class="table table-striped nowrap" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Foto</th>
                                                <th>Nombres</th>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/ListaUsuariosIn.js" type="text/javascript"></script>
    
</asp:Content>
