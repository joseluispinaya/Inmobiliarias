<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="DetallePropiedadIn.aspx.cs" Inherits="CapaPresentacion.DetallePropiedadIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <div class="row">
    <div class="col-md-12">
      <div class="row" id="cargan">
        <div class="col-md-6 col-12 mb-md-0 mb-4">
          <div class="card">
            <h5 class="card-header">Detalle Propiedad</h5>
            <div class="card-body">
              <%--<p>Display content from your connected accounts on your site</p>--%>
                <input id="txtIdPropiedad" name="IdPropiedad" value="0" type="hidden" />
                <input id="txtIdPropietario" name="IdPropietario" value="0" type="hidden" />
              <!-- Connections -->
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
                    <div class="d-flex mb-3">
                        <div class="flex-shrink-0">
                            <i class="bx bx-home me-3" style="font-size: 2rem;"></i>
                        </div>
                        <div class="flex-grow-1 row">
                            <div class="col-12 mb-sm-0 mb-2">
                                <h6 class="mb-0">Estado</h6>
                                <small id="lblEstado" class="text-muted"></small>
                            </div>
                        </div>
                    </div>
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
                    <div class="d-flex mb-3">
                        <div class="flex-shrink-0">
                            <i class="bx bx-camera me-3" style="font-size: 2rem;"></i>
                        </div>
                        <div class="flex-grow-1 row">
                            <div class="col-12 mb-sm-0 mb-2">
                                <h6 class="mb-0">Imagenes</h6>
                                <small id="lblImagen" class="text-muted"></small>
                            </div>
                        </div>
                    </div>
                </div>
               </div>

                <h6 class="mb-0">Direccion</h6>
                <p id="lblDireccion"></p>

                <h6 class="mb-0">Comentario</h6>
                <p id="lblComentario"></p>

                <%--<div class="text-center">
                    <img id="imgPropiedadDet" src="Imagenes/sinimg.png" alt="Foto usuario"
                    style="width:120px;height:120px;max-width: 100%; height: auto;" class="d-block rounded" />
                </div>--%>
              
              <!-- /Connections DetallePropiedadIn.aspx -->

              <div class="mt-2">
                <button type="button" class="btn btn-sm rounded-pill btn-success me-2">Guardar</button>
                  <button type="button" id="btnNuevoIm" class="btn btn-sm rounded-pill btn-info me-2">Add Imagen</button>
                <button type="button" id="btnRegresar" class="btn btn-sm rounded-pill btn-danger">Atras</button>
            </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="card">
            <h5 class="card-header">Imagenes de la propiedad</h5>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <table id="tbDtImagenes" class="table table-striped nowrap" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Imagen</th>
                                    <th></th>
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

    <div class="modal fade" id="modalImagen" tabindex="-1" aria-hidden="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel3">Agregar Imagen</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="txtImagen" class="form-label">Seleccione Una Imagen</label>
                        <input class="form-control" type="file" id="txtImagen" accept="image/*" />
                    </div>

                    <div class="text-center">
                        <%--<img id="imgPropiedad" src="Imagenes/sinimg.png" alt="Foto usuario"
                            style="height: 200px; max-width: 200px;" />--%>
                        <img id="imgPropiedad" src="Imagenes/sinimg.png" alt="Foto usuario"
                            style="max-width: 200px; max-height: 200px; width: auto; height: auto;" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="button" id="btnguardarIma" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/DetallePropiedadIn.js" type="text/javascript"></script>
</asp:Content>
