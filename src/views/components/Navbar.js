const user = "Sam";

const Navbar = {
  render: async () => {
    const view = `
            <nav class="navbar" >
                <a href="/#/" class="logo">Shopping lists</a>
                <div class="dropdown" tabindex="0" alt="menu">
                    <button class="dropbtn" id="menu" tabindex="0">   ${user}
                    </button>
                    <div class="dropdown-content">
                        <a href="/#/friends" tabindex="0">Friends</a>  
                        <a href="/#/logout" tabindex="0">Logout</a>
                    </div>  
                </div>        
            </nav>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Navbar;
