
/* =====================================
   Ög SOCIAL — APP COMPARTIDA
   ===================================== */

(() => {
  "use strict";

  const SUPABASE_URL =
    "https://axxafvggyetnnaumqefi.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_O4wRZft0LCo3DYiCWT4iqg_E5_c8B2A";

  if (!window.supabase) {
    console.error("No se pudo cargar Supabase.");
    return;
  }

  // Evita crear más de un cliente si el archivo
  // se carga accidentalmente dos veces.
  if (!window.ogDB) {
    window.ogDB = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );
  }

  window.og = window.og || {};

  window.og.db = window.ogDB;

  // Usuario autenticado
  window.og.getUser = async function () {
    const { data, error } =
      await window.ogDB.auth.getUser();

    if (error) throw error;

    return data.user || null;
  };

  // Sesión actual
  window.og.getSession = async function () {
    const { data, error } =
      await window.ogDB.auth.getSession();

    if (error) throw error;

    return data.session || null;
  };

  // Cerrar sesión
  window.og.signOut = async function () {
    const { error } =
      await window.ogDB.auth.signOut();

    if (error) throw error;

    window.location.href = "/index.html";
  };

  // Escapar texto para mostrarlo de forma segura
  window.og.escapeHTML = function (value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
    );
  };

  // Formato de fechas
  window.og.formatDate = function (value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleString("es-AR", {
      dateStyle: "short",
      timeStyle: "short"
    });
  };

  // Subir imágenes al almacenamiento
  window.og.uploadImage = async function (
    file,
    folder = "media"
  ) {
    const user = await window.og.getUser();

    if (!user) {
      throw new Error("Iniciá sesión primero.");
    }

    if (!file || !file.type.startsWith("image/")) {
      throw new Error("Seleccioná una imagen válida.");
    }

    if (file.size > 8 * 1024 * 1024) {
      throw new Error("La imagen supera los 8 MB.");
    }

    const extension =
      file.name.split(".").pop().toLowerCase();

    const path =
      user.id + "/" + folder + "-" +
      Date.now() + "." + extension;

    const { error } = await window.ogDB
      .storage
      .from("og-media")
      .upload(path, file, {
        upsert: false,
        contentType: file.type
      });

    if (error) throw error;

    const { data } = window.ogDB
      .storage
      .from("og-media")
      .getPublicUrl(path);

    return data.publicUrl;
  };

  // Estado de autenticación
  window.ogDB.auth.onAuthStateChange(
    (event, session) => {
      window.dispatchEvent(
        new CustomEvent("og:auth", {
          detail: {
            event,
            user: session?.user || null
          }
        })
      );
    }
  );

  console.log("Ög Social: conexión compartida preparada.");
})();
