// Application form submit: native-validate, POST to the form service,
// show inline success/error without a page reload.
document.addEventListener('astro:page-load', () => {
  const form = document.getElementById('applyForm');

  if (form) {
    const errorEl = document.getElementById('applyError');
    const successEl = document.getElementById('applySuccess');
    const submitBtn = form.querySelector('.apply__submit');
    const labelEl = form.querySelector('.apply__submit-label');
    const idleText = labelEl ? labelEl.textContent : '';
    const sendingText = labelEl?.dataset.sending || idleText;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (errorEl) errorEl.hidden = true;

      if (!form.checkValidity()) {
        form.reportValidity();
        const firstInvalid = form.querySelector(':invalid');
        firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      submitBtn.disabled = true;
      if (labelEl) labelEl.textContent = sendingText;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        form.hidden = true;
        if (successEl) {
          successEl.hidden = false;
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } catch (err) {
        if (errorEl) errorEl.hidden = false;
        submitBtn.disabled = false;
        if (labelEl) labelEl.textContent = idleText;
      }
    });
  }
});
