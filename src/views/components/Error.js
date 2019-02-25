let Error = {
  render: async () => {
    let view = `
              <section class="section">
                  <h2> Page not found! </h2>
              </section>
          `;
    return view;
  },
  after_render: async () => {}
};
export default Error;
