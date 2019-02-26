let Friends = {
  render: async () => {
    let view = `
        <section class="section">
        <a class="link" href="/#/"><<</a><br>
            <h1>Friends</h1>
        <p>Search, add and remove friends to share your shopping lists with. (Not implemented.)</p>
        </section>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Friends;
