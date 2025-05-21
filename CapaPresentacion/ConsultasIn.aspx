<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="ConsultasIn.aspx.cs" Inherits="CapaPresentacion.ConsultasIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-lg-12">
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Paseo virtual</h5>
                <small class="text-muted float-end">Lista</small>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12" id="paseo">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    <%--<div class="layout-demo-wrapper">
        <div class="layout-demo-placeholder">
            <div id="MMqLrAhy2oN">
            <script type="text/javascript" 
            async data-short="MMqLrAhy2oN" 
            data-path="tours" 
            data-is-self-hosted="false" 
            width="100%" height="500px" 
            src="https://app.cloudpano.com/public/shareScript.js">
            </script>
        </div>
        </div>
        <div class="layout-demo-info">
            <h4>Paseo Virtual</h4>
            <p>Una mejor manera de ver las propiedades.</p>
        </div>
    </div>--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/ConsultasIn.js" type="text/javascript"></script>
</asp:Content>
