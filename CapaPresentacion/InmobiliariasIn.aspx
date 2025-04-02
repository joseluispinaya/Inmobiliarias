<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="InmobiliariasIn.aspx.cs" Inherits="CapaPresentacion.InmobiliariasIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-xl-12">
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
                aria-selected="true"
              >
                <i class="tf-icons bx bx-menu"></i> Inmobiliarias
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
                aria-selected="false"
              >
                <i class="tf-icons bx bx-home"></i> Nuevo Registro
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
                aria-selected="false"
              >
                <i class="tf-icons bx bx-detail"></i> Consultas
              </button>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="navs-pills-justified-home" role="tabpanel">
                <div class="row">
                    <div class="col-lg-12 mb-0">
                        <table id="example" class="table table-striped" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tiger Nixon</td>
                                    <td>System Architect</td>
                                    <td>Edinburgh</td>
                                    <td>61</td>
                                    <td>2011-04-25</td>
                                    <td>$320,800</td>
                                </tr>
                                <tr>
                                    <td>Garrett Winters</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>63</td>
                                    <td>2011-07-25</td>
                                    <td>$170,750</td>
                                </tr>
                                <tr>
                                    <td>Ashton Cox</td>
                                    <td>Junior Technical Author</td>
                                    <td>San Francisco</td>
                                    <td>66</td>
                                    <td>2009-01-12</td>
                                    <td>$86,000</td>
                                </tr>
                                <tr>
                                    <td>Cedric Kelly</td>
                                    <td>Senior Javascript Developer</td>
                                    <td>Edinburgh</td>
                                    <td>22</td>
                                    <td>2012-03-29</td>
                                    <td>$433,060</td>
                                </tr>
                                <tr>
                                    <td>Airi Satou</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>33</td>
                                    <td>2008-11-28</td>
                                    <td>$162,700</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="navs-pills-justified-profile" role="tabpanel">
                <div class="row">
                    <div class="col-md">
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center" style="padding: 10px;">
                                <h5 class="mb-0">Registrar Inmobiliaria</h5>
                                <button type="button" id="btnGuardarR" class="btn btn-sm rounded-pill btn-success">Guardar</button>
                            </div>
                            <div class="card-body">
                                <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="txtNombreIn" class="form-label">Inmobiliaria:</label>
                                <input class="form-control form-control-sm" type="text" id="txtNombreIn" name="Nombre"
                                    autofocus />
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="txtPropietario" class="form-label">Propietario:</label>
                                <input class="form-control form-control-sm" type="text" name="Propietario" id="txtPropietario" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="txtCorreoIn" class="form-label">Correo:</label>
                                <input class="form-control form-control-sm" type="text" id="txtCorreoIn" name="Correo"
                                    placeholder="correo@example.com" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="txtDireccion" class="form-label">Direccion:</label>
                                <input type="text" class="form-control form-control-sm" id="txtDireccion"
                                    name="Direccion" />
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="txtCelular" class="form-label">Celular</label>
                                <input class="form-control form-control-sm" type="text" id="txtCelular" name="Celular"
                                    placeholder="Celular" />
                            </div>
                            <div class="mb-3 col-md-6">
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
                    <div class="col-md">
                        <div class="card">
                            <div class="row g-0">
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">
                                            This is a wider card with supporting text below as a natural lead-in to additional content.
                This content is a little bit longer.
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
            </div>
            <div class="tab-pane fade" id="navs-pills-justified-messages" role="tabpanel">
              <p>
                Oat cake chupa chups dragée donut toffee. Sweet cotton candy jelly beans macaroon gummies
                cupcake gummi bears cake chocolate.
              </p>
              <p class="mb-0">
                Cake chocolate bar cotton candy apple pie tootsie roll ice cream apple pie brownie cake. Sweet
                roll icing sesame snaps caramels danish toffee. Brownie biscuit dessert dessert. Pudding jelly
                jelly-o tart brownie jelly.
              </p>
            </div>
          </div>
        </div>
      </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/InmobiliariasIn.js" type="text/javascript"></script>
</asp:Content>
