<%@ Page Title="" Language="C#" MasterPageFile="~/PresentacionClie/PageClien.Master" AutoEventWireup="true" CodeBehind="DetallePropiedadC.aspx.cs" Inherits="CapaPresentacion.PresentacionClie.DetallePropiedadC" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/sliderze.css">
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
                <div class="text text-center mb-2">
                    <h3 id="lblTipop" class="mb-0">T</h3>
                    <%--<h3 class="mb-0"><a href="#">Blue View Home</a></h3>--%>
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
                    <%--<div class="col-md-6">
                        <ul class="features">
                            <li class="check"><span class="ion-ios-checkmark-circle"></span>Floor Area: 1,300 SQ FT</li>
                            <li class="check"><span class="ion-ios-checkmark-circle"></span>Year Build:: 2019</li>
                            <li class="check"><span class="ion-ios-checkmark-circle"></span>Bed Rooms: 5</li>
                        </ul>
                    </div>--%>
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
                        <%--<div class="cardz">
                            <div class="imgz">
                                <img src="images/work-1.jpg" alt="">
                             </div>
                        </div>
                        <div class="cardz">
                            <div class="imgz">
                                <img src="images/work-2.jpg" alt="">
                             </div>
                        </div>
                        <div class="cardz">
                            <div class="imgz">
                                <img src="images/work-3.jpg" alt="">
                             </div>
                        </div>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jszero/DetallePropiedadC.js" type="text/javascript"></script>
</asp:Content>
