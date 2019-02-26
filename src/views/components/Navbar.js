const user = "Sam";

let Navbar = {
  render: async () => {
    let view = `
             <nav class="navbar" >
             <a href="/#/" class="logo">Shopping lists</a>
                <div>
                    <div>
                        <div>
                            <a href="/#/logout">Logout</a>
                        </div>
                        <div>
                            <a href="/#/friends">
                                Friends
                            </a>       
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
