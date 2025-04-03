<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="PropietariosIn.aspx.cs" Inherits="CapaPresentacion.PropietariosIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-12">
            <ul class="nav nav-pills flex-column flex-md-row mb-3">
                <li class="nav-item">
                    <a class="nav-link active" href="javascript:void(0);"><i class="bx bx-user me-1"></i>Account</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="bx bx-bell me-1"></i>Notifications</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="bx bx-link-alt me-1"></i>Connections</a>
                </li>
            </ul>
            <div class="card mb-4">
                <h5 class="card-header">Profile Details</h5>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <label for="firstName" class="form-label">First Name</label>
                                    <input
                                        class="form-control form-control-sm"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value="John"
                                        autofocus />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="lastName" class="form-label">Last Name</label>
                                    <input class="form-control form-control-sm" type="text" name="lastName" id="lastName" value="Doe" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="email" class="form-label">E-mail</label>
                                    <input
                                        class="form-control form-control-sm"
                                        type="text"
                                        id="email"
                                        name="email"
                                        value="john.doe@example.com"
                                        placeholder="john.doe@example.com" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="organization" class="form-label">Organization</label>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="organization"
                                        name="organization"
                                        value="ThemeSelection" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <label for="state" class="form-label">State</label>
                                    <input class="form-control form-control-sm" type="text" id="state" name="state" placeholder="California" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="zipCode" class="form-label">Zip Code</label>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="zipCode"
                                        name="zipCode"
                                        placeholder="231465"
                                        maxlength="6" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label class="form-label" for="country">Country</label>
                                    <select id="country" class="form-select form-select-sm">
                                        <option value="">Select</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Thailand">Thailand</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="language" class="form-label">Language</label>
                                    <select id="language" class="form-select form-select-sm">
                                        <option value="">Select Language</option>
                                        <option value="en">English</option>
                                        <option value="fr">French</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="mb-3 col-md-7">
                                    <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                                </div>

                                <div class="col-md-5">
                                    <div class="mb-3">
                                        <label for="defaultInputs" class="form-label">Campo2 input</label>
                                        <input id="defaultInputs" class="form-control form-control-sm" type="text" placeholder="Campo2 input">
                                    </div>
                                    <div class="mb-3">
                                        <label for="defaultInputss" class="form-label">Campo input</label>
                                        <input id="defaultInputss" class="form-control form-control-sm" type="text" placeholder="Campo input">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <h5>Basic Layout</h5>
                            <div class="d-flex align-items-start align-items-sm-center gap-4">
                                <img
                                    src="assets/img/avatars/1.png"
                                    alt="user-avatar"
                                    class="d-block rounded"
                                    height="100"
                                    width="100"
                                    id="uploadedAvatar" />
                                <div class="button-wrapper">
                                    <label for="upload" class="btn btn-primary me-2 mb-0" tabindex="0">
                                        <span class="d-none d-sm-block">new photo</span>
                                        <i class="bx bx-upload d-block d-sm-none"></i>
                                        <input
                                            type="file"
                                            id="upload"
                                            class="account-file-input"
                                            hidden
                                            accept="image/png, image/jpeg" />
                                    </label>
                                    <button type="button" class="btn btn-outline-secondary account-image-reset mb-0">
                                        <i class="bx bx-reset d-block d-sm-none"></i>
                                        <span class="d-none d-sm-block">Reset</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2">
                        <button type="button" class="btn btn-sm btn-primary me-2">Save changes</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
