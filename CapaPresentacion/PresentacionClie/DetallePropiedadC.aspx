<%@ Page Title="" Language="C#" MasterPageFile="~/PresentacionClie/PageClien.Master" AutoEventWireup="true" CodeBehind="DetallePropiedadC.aspx.cs" Inherits="CapaPresentacion.PresentacionClie.DetallePropiedadC" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<link rel="stylesheet" href="../assets/plugin/bootstrap-timepicker/css/bootstrap-timepicker.min.css" >--%>
    <link rel="stylesheet" href="jquery-ui/jquery-ui.css" >
    <link  rel="stylesheet" href="toastr/toastr.min.css" >
    <link rel="stylesheet" href="css/sliderze.css">
    <style>
        .form-control-smz {
            height: calc(1.5em + 0.5rem + 2px) !important;
            padding: 0.25rem 0.5rem !important;
            font-size: 0.875rem !important;
            line-height: 1.5 !important;
            border-radius: 0.2rem !important;
        }

        .form-controlz {
            display: block !important;
            width: 100% !important;
            font-weight: 400 !important;
            color: #6e707e !important;
            background-color: #fff !important;
            background-clip: padding-box !important;
            border: 1px solid #d1d3e2 !important;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <section class="ftco-section" style="padding: 6em 0 2em 0;">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 heading-section text-center ftco-animate">
          <span class="subheading">DETALLE PROPIEDAD</span>
          <h2 class="mb-2">Propiedad con paseo virtual</h2>
        </div>
      </div>
    </div>
  </section>

   <section class="ftco-section ftco-property-details" style="padding: 1em 0 5em 0;">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="property-details" id="paseo">
                    <%--<div class="img rounded" style="background-image: url(images/work-1.jpg);"></div>--%>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 pills" style="margin-top: 10px;">
                <input type="hidden" value="0" id="txtIdPropieDetz">
                <input type="hidden" value="0" id="txtIdInmoz">
                <div class="text text-center mb-2">
                    <h3 id="lblTipop" class="mb-0">T</h3>
                    <p id="lblDireccion" style="margin-bottom: 0;">USA</p>
                    <a id="txturlubi" href="#" target="_blank" style="color: #007bff;"><i class="ion-ios-pin mr-2"></i>Ubicacion de la Propiedad</a>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <ul class="features">
                            <li id="txtPrecio" class="check"><span class="ion-ios-checkmark-circle"></span>a</li>
                            <li id="txtmts" class="check"><span class="ion-ios-checkmark-circle"></span>a</li>
                            <li id="txtEstado" class="check"><span class="ion-ios-checkmark-circle"></span>B</li>
                        </ul>
                    </div>
                </div>
                <div class="text">
                    <p id="lblComentarios" style="margin-bottom: 0;"></p>
                </div>
            </div>
            <div class="col-md-6 pills" style="margin-top: 10px;">
                <div class="text">
                    <h3 class="mb-0"><a href="#">Imagenes</a></h3>
                </div>
                <div class="wrapperz">
                    <div class="carouselz owl-carousel">
                    </div>
                </div>

                <div class="row justify-content-center" style="margin-top: 10px;">
                    <button id="btnReservar" type="button" class="btn btn-primary"><span class="icon-mobile-phone"></span> Solicitar Visita</button>
                </div>

            </div>
        </div>
    </div>
</section>

    <div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="miModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <!-- Encabezado del Modal -->
                <div class="modal-header">
                    <h5 class="modal-title" id="miModalLabel">Formulario de Registro</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Cuerpo del Modal -->
                <div class="modal-body" id="loadcl">

                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtNumeroDocumento">Numero C.I.</label>
                            <input type="text" class="form-controlz form-control-smz input-validar" id="txtNumeroDocumento"
                                name="Numero Documento">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtNombresz">Nombres</label>
                            <input type="text" class="form-controlz form-control-smz input-validar" id="txtNombresz" name="Nombres">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtApellidosz">Apellidos</label>
                            <input type="text" class="form-controlz form-control-smz input-validar" id="txtApellidosz"
                                name="Apellidos">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtCelularz">Celular</label>
                            <input type="text" class="form-controlz form-control-smz input-validar" id="txtCelularz" name="Celular">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-sm-12">
                            <label for="txtDireccionz">Direccion</label>
                            <input type="text" class="form-controlz form-control-smz input-validar" id="txtDireccionz"
                                name="Direccion">
                        </div>
                    </div>
                </div>

                <!-- Pie del Modal -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarProz" type="button" class="btn btn-primary">Guardar cambios</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="miModalogo" tabindex="-1" role="dialog" aria-labelledby="miModalLabelog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">

            <!-- Encabezado del Modal -->
            <div class="modal-header">
                <h5 class="modal-title" id="miModalLabelog">Verificacion de sesion</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <!-- Cuerpo del Modal -->
            <div class="modal-body">

                <div class="form-row">
                    <div class="form-group col-sm-12">
                        <label for="txtNroCiz">Ingrese su numero de C.I.</label>
                        <input type="text" class="form-controlz form-control-smz" id="txtNroCiz"
                            name="Nro de cedula de identidad">
                    </div>
                </div>
            </div>

            <!-- Pie del Modal -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button id="btnGuardarProLogi" type="button" class="btn btn-primary">Buscar Sesion</button>
            </div>

        </div>
    </div>
</div>


    <!-- Modal grande -->
<div class="modal fade" id="modalGrande" tabindex="-1" role="dialog" aria-labelledby="modalGrandeLabel" aria-hidden="true">
  <div class="modal-dialog" role="document"> <!-- Aquí está la clase modal-lg -->
    <div class="modal-content">

      <!-- Encabezado -->
      <div class="modal-header">
        <h5 class="modal-title" id="modalGrandeLabel">Solicitar Visita</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <!-- Cuerpo -->
        <div class="modal-body" id="loadVisi">
            <div class="form-row">
                <div class="form-group col-sm-6">
                    <label for="txtFechaRese">Fecha de Visita</label>
                    <input type="text" class="form-controlz form-control-smz" id="txtFechaRese" />
                </div>
                <div class="form-group col-sm-6">
                    <label for="timepicker2">Hora de Visita</label>
                    <input type="text" class="form-controlz form-control-smz" id="timepicker2" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-12">
                    <label for="txtEncuentro">Punto de encuentro</label>
                    <input type="text" class="form-controlz form-control-smz" id="txtEncuentro" />
                </div>
            </div>
        </div>

      <!-- Pie -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button id="btnGuardarReserva" type="button" class="btn btn-primary">Guardar Solicitar</button>
      </div>

    </div>
  </div>
</div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <%--<script src="../assets/plugin/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>--%>
    <script src="jquery-ui/jquery-ui.js"></script>
    <script src="jquery-ui/idioma/datepicker-es.js"></script>
    <script src="toastr/toastr.min.js"></script>
    <script src="jszero/DetallePropiedadC.js" type="text/javascript"></script>
</asp:Content>
