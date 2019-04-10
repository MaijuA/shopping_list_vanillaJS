const Error = {
  render: async () => {
    const view = `
              <section class="section">
              <a class="link" href="/#/"><<</a><br>
                  <h2> Page not found! </h2>
              </section>
          `;
    return view;
  },
  after_render: async () => {}
};
export default Error;
