<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="DetallePropietarioIn.aspx.cs" Inherits="CapaPresentacion.DetallePropietarioIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-md-12">
      <div class="card mb-4" id="loadDeta">
        <h5 class="card-header">Detalles del Propietario</h5>
        <!-- Detalle propietario -->
        <div class="card-body">
            <input id="txtIdPropie" name="IdPropietario" value="0" type="hidden" />
            <div class="row">
                <label class="col-sm-2 col-form-label" for="txtFullnombre">Propietario:</label>
                <div class="mb-2 col-sm-3">
                    <div class="input-group input-group-merge input-group-sm">
                        <span id="basic-fullnombre" class="input-group-text"><i class="bx bx-user"></i></span>
                        <input type="text" class="form-control" id="txtFullnombre" aria-label="Propietario"
                            aria-describedby="basic-fullnombre" readonly style="background-color: #fff;" />
                    </div>
                </div>
                <div class="mb-2 col-sm-2">
                    <div class="input-group input-group-merge input-group-sm">
                        <span id="basic-nroci" class="input-group-text"><i class="bx bx-user"></i></span>
                        <input type="text" class="form-control" id="txtNrociP" aria-label="Nro CI"
                            aria-describedby="basic-nroci" readonly style="background-color: #fff;" />
                    </div>
                </div>
                <div class="mb-2 col-sm-2">
                    <div class="input-group input-group-merge input-group-sm">
                        <span id="basic-fono" class="input-group-text"><i class="bx bx-phone"></i></span>
                        <input type="text" id="txtcelprop" class="form-control phone-mask" aria-label="Nro celular"
                            aria-describedby="basic-fono" readonly style="background-color: #fff;" />
                    </div>
                </div>
                <div class="col-sm-3">
                    <button type="button" id="btnAddPro" class="btn btn-sm btn-success me-2"><i class='bx bx-home'></i> Nuevo</button>
                    <button type="button" id="btnAtras" class="btn btn-sm btn-danger"><i class='bx bx-chevron-right-circle'></i> Regresar</button>
                </div>
            </div>
        </div>
        <hr class="my-0" />
        <div class="card-body">
            <p id="lblDetalles">Lista</p>
            <div class="row">
                <div class="col-lg-12">
                    <table id="tbDtPropiedades" class="table table-striped nowrap" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Codigo</th>
                                <th>Direccion</th>
                                <th>Precio</th>
                                <th>Dimension</th>
                                <th>Tipo</th>
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
        <!-- /propietario -->
      </div>
      <div class="card">
        <h5 class="card-header">Alguna Opcion</h5>
        <div class="card-body">
          <div class="mb-3 col-12 mb-0">
            <div class="alert alert-warning">
              <h6 class="alert-heading fw-bold mb-1">Are you sure you want to delete your account?</h6>
              <p class="mb-0">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/DetallePropietarioIn.js" type="text/javascript"></script>
</asp:Content>
