﻿<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="PropiedadesIn.aspx.cs" Inherits="CapaPresentacion.PropiedadesIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .gmapsz {
            height: 290px;
            width: 100%;
            border-radius: 4px;
            margin-bottom: 10px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-xxl">
        <div class="card mb-2">
            <div class="card-body">
                <div class="row">
                    <label class="col-sm-2 col-form-label" for="txtFullname">Propietario</label>
                    <div class="col-sm-4">
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-fullname" class="input-group-text"><i
                                    class="bx bx-user"></i></span>
                            <input type="text" class="form-control" id="txtFullname"
                                aria-label="John Doe"
                                aria-describedby="basic-fullname" readonly />
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-ci" class="input-group-text"><i
                                    class="bx bx-phone"></i></span>
                            <input type="text" id="txtnrocilprop" class="form-control phone-mask"
                                placeholder="658 799 8941" aria-label="658 799 8941"
                                aria-describedby="basic-ci" readonly />
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-fono" class="input-group-text"><i
                                    class="bx bx-phone"></i></span>
                            <input type="text" id="txtcelprop" class="form-control phone-mask"
                                placeholder="658 799 8941" aria-label="658 799 8941"
                                aria-describedby="basic-fono" readonly />
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <button type="button" class="btn btn-sm btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <div class="row">
    <div class="col-xl">
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Registro de Propiedades</h5>
                <small class="text-muted float-end">Inmobiliarias</small>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="mb-3 col-md-4">
                        <label class="form-label" for="cboPropie">Estado</label>
                        <select id="cboPropie" class="form-select form-select-sm">
                            <option value="">Select</option>
                            <option value="Administrador">Activo</option>
                            <option value="Secretaria">Secretaria</option>
                        </select>
                    </div>
                    <div class="mb-3 col-md-4">
                        <label for="cboTipoprop" class="form-label">Tipo Propiedad</label>
                        <select id="cboTipoprop" class="form-select form-select-sm">
                            <option value="">Select</option>
                            <option value="en">Departamento</option>
                            <option value="fr">Grupo Zion</option>
                        </select>
                    </div>
                    <div class="mb-3 col-md-4">
                        <label for="cboDistrito" class="form-label">Distrito</label>
                        <select id="cboDistrito" class="form-select form-select-sm">
                            <option value="">Select</option>
                            <option value="en">Distrito 1</option>
                            <option value="fr">Grupo Zion</option>
                        </select>
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label" for="txtPrecio">Precio</label>
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-Precio" class="input-group-text"><i
                                    class="bx bx-dollar"></i></span>
                            <input type="text" id="txtPrecio" class="form-control"
                                placeholder="100" aria-label="100"
                                aria-describedby="basic-Precio" />
                        </div>
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label" for="txtSuperficie">Superficie</label>
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-Superficie" class="input-group-text"><i
                                    class="bx bx-ruler"></i></span>
                            <input type="text" id="txtSuperficie" class="form-control"
                                placeholder="100" aria-label="100"
                                aria-describedby="basic-Superficie" />
                        </div>
                    </div>
                    <div class="mb-3 col-md-4">
                        <label class="form-label" for="txtCasa">Nro Casa</label>
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-Casa" class="input-group-text"><i
                                    class="bx bx-home"></i></span>
                            <input type="text" id="txtCasa" class="form-control"
                                placeholder="10" aria-label="10"
                                aria-describedby="basic-Casa" />
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label" for="txtDireccion">Direccion</label>
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-icon-default-direccion" class="input-group-text"><i
                                    class="bx bx-buildings"></i></span>
                            <input type="text" class="form-control" id="txtDireccion" placeholder="Direccion"
                                aria-label="Direccion" aria-describedby="basic-icon-default-direccion" />
                        </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="txtVirtual">Url Virtual</label>
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-Virtual" class="input-group-text"><i
                                    class="bx bx-link"></i></span>
                            <input type="text" class="form-control" id="txtVirtual" placeholder="URL"
                                aria-label="URL" aria-describedby="basic-Virtual" />
                        </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="txtComentario">Comentario</label>
                    <div class="input-group input-group-merge">
                      <span id="basic-Comentario" class="input-group-text"
                        ><i class="bx bx-comment"></i
                      ></span>
                      <textarea
                        id="txtComentario"
                        class="form-control"
                        placeholder="Comentarios"
                        aria-label="Comentarios"
                        aria-describedby="basic-Comentario"
                      ></textarea>
                    </div>
                  </div>
            </div>
        </div>
    </div>
    <div class="col-xl">
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Seleccione Ubicacion</h5>
                <small class="text-muted float-end">Propiedad</small>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="txtLatitud">Latitud</label>
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-Latitud" class="input-group-text"><i
                                    class="bx bx-been-here"></i></span>
                            <input type="text" id="txtLatitud" class="form-control"
                                placeholder="-100" aria-label="-100"
                                aria-describedby="basic-Latitud" readonly />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="txtLongitud">Longitud</label>
                        <div class="input-group input-group-merge input-group-sm">
                            <span id="basic-Longitud" class="input-group-text"><i
                                    class="bx bx-been-here"></i></span>
                            <input type="text" id="txtLongitud" class="form-control"
                                placeholder="-10" aria-label="-10"
                                aria-describedby="basic-Longitud" readonly />
                        </div>
                    </div>
                </div>

                <div id="mapaz" class="gmapsz"></div>

                <div class="mt-4">
                    <button type="button" id="btnGuardarPro" class="btn btn-sm rounded-pill btn-success me-2">Guardar</button>
                    <button type="button" class="btn btn-sm rounded-pill btn-danger">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PropiedadesIn.js" type="text/javascript"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF1HcfGOeusxinFBpjXsMccjQxCtxRrV4&loading=async&callback=initMap"></script>
</asp:Content>
