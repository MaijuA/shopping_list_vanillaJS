const Logout = {
  render: async () => {
    const view = `
      <section class="section">
      <a class="link" href="/#/"><<</a><br>
          <h1 tabindex="0">Logged out</h1>
          <p tabindex="0">You've been succesfully logged out!</p>
          <a href="/#/">Log in!</a>
          <p tabindex="0">(If the login feature was implemented, you would now see the applications front page instead of a "logout" page.)</p>
      </section>`;
    return view;
  },
  after_render: async () => {}
};

export default Logout;
