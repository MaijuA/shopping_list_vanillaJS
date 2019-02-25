const user = "Sam";

let Navbar = {
  render: async () => {
    let view = `
             <nav class="navbar" >
                <div>
                    <div>
                        <div class="nav1">
                            <a href="/#/">
                                Shopping lists
                            </a>       
                        </div>
                        <div>
                            <a href="/#/friends">
                                Friends
                            </a>       
                        </div>
                        <div class="dropdown">
                            <button class="dropbtn">   ${user}
                            </button>
                            <div class="dropdown-content">
                                <a href="/#/logout">Logout</a>
                            </div>  
                        </div>
                    </div>
                </div>
            </nav>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Navbar;
