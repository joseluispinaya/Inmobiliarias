<%@ Page Title="" Language="C#" MasterPageFile="~/PageH.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="CapaPresentacion.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-md-6">
        <div class="card mb-4">
            <h5 class="card-header">Basic</h5>
            <div class="card-body demo-vertical-spacing demo-only-element">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon11">@</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon11"
                />
              </div>

              <div class="form-password-toggle">
                <label class="form-label" for="basic-default-password12">Password</label>
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control"
                    id="basic-default-password12"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="basic-default-password2"
                  />
                  <span id="basic-default-password2" class="input-group-text cursor-pointer"
                    ><i class="bx bx-hide"></i
                  ></span>
                </div>
              </div>

              <div class="input-group">
                <span class="input-group-text" id="basic-addon14">https://example.com/users/</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="URL"
                  id="basic-url1"
                  aria-describedby="basic-addon14"
                />
              </div>

              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Amount"
                  aria-label="Amount (to the nearest dollar)"
                />
                <span class="input-group-text">.00</span>
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">@</span>
                <input type="text" class="form-control" placeholder="Username" />
              </div>
              
            </div>
          </div>
    </div>
    <div class="col-md-6">
        <div class="card mb-4">
            <h5 class="card-header">Merged</h5>
            <div class="card-body demo-vertical-spacing demo-only-element">
              <div class="input-group input-group-merge">
                <span class="input-group-text" id="basic-addon-search31"><i class="bx bx-search"></i></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  aria-label="Search..."
                  aria-describedby="basic-addon-search31"
                />
              </div>

              <div class="form-password-toggle">
                <label class="form-label" for="basic-default-password32">Password</label>
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    class="form-control"
                    id="basic-default-password32"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="basic-default-password"
                  />
                  <span class="input-group-text cursor-pointer" id="basic-default-password"
                    ><i class="bx bx-hide"></i
                  ></span>
                </div>
              </div>

              <div class="input-group input-group-merge">
                <span class="input-group-text" id="basic-addon34">https://example.com/users/</span>
                <input type="text" class="form-control" id="basic-url3" aria-describedby="basic-addon34" />
              </div>

              <div class="input-group input-group-merge">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="100"
                  aria-label="Amount (to the nearest dollar)"
                />
                <span class="input-group-text">.00</span>
              </div>
            </div>
          </div>
    </div>
</div>

    <div class="row">
    <div class="col-xl">
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Basic Layout</h5>
                <small class="text-muted float-end">Default label</small>
            </div>
            <div class="card-body">
                <div>
                    <div class="mb-3">
                        <label class="form-label" for="basic-default-fullname">Full Name</label>
                        <input type="text" class="form-control" id="basic-default-fullname" placeholder="John Doe" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="basic-default-email">Email</label>
                        <div class="input-group input-group-merge">
                            <input type="text" id="basic-default-email" class="form-control" placeholder="john.doe"
                                aria-label="john.doe" aria-describedby="basic-default-email2" />
                            <span class="input-group-text" id="basic-default-email2">@example.com</span>
                        </div>
                        <div class="form-text">You can use letters, numbers & periods</div>
                    </div>
                    <!-- <button type="button" class="btn btn-primary">Send</button> -->
                    <div class="demo-inline-spacing">
                        <button type="button" class="btn rounded-pill btn-primary">
                          <span class="tf-icons bx bx-pie-chart-alt"></span>&nbsp; Primary
                        </button>
                        <button type="button" class="btn rounded-pill btn-secondary">
                          <span class="tf-icons bx bx-bell"></span>&nbsp; Secondary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl">
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Basic with Icons</h5>
              <small class="text-muted float-end">Merged input group</small>
            </div>
            <div class="card-body">
              <div>
                <div class="mb-3">
                  <label class="form-label" for="basic-icon-default-fullname">Full Name</label>
                  <div class="input-group input-group-merge">
                    <span id="basic-icon-default-fullname2" class="input-group-text"
                      ><i class="bx bx-user"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="John Doe"
                      aria-label="John Doe"
                      aria-describedby="basic-icon-default-fullname2"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="basic-icon-default-email">Email</label>
                  <div class="input-group input-group-merge">
                    <span class="input-group-text"><i class="bx bx-envelope"></i></span>
                    <input
                      type="text"
                      id="basic-icon-default-email"
                      class="form-control"
                      placeholder="john.doe"
                      aria-label="john.doe"
                      aria-describedby="basic-icon-default-email2"
                    />
                    <span id="basic-icon-default-email2" class="input-group-text">@example.com</span>
                  </div>
                  <div class="form-text">You can use letters, numbers & periods</div>
                </div>
                <!-- <button type="button" class="btn btn-primary">Send</button> -->
                <div class="demo-inline-spacing">
                    <button type="button" class="btn btn-sm btn-primary">Button sm</button>
                    <button type="button" class="btn btn-xs btn-primary">Button xs</button>
                  </div>
              </div>
            </div>
          </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
