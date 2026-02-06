const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};

const getTemplate = (templateName, variables = {}) => {
  const templatePath = path.join(
    __dirname,
    "../templates/emails",
    templateName,
  );
  let template = fs.readFileSync(templatePath, "utf8");
  for (const key in variables) {
    template = template.replaceAll(`{{${key}}}`, variables[key]);
  }
  return template;
};

const sendWelcomeEmail = async (user) => {
  const html = getTemplate("welcome.html", { name: user.name });
  await sendEmail(user.email, "Welcome to Our Blog!", html);
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const html = getTemplate("passwordReset.html", { name: user.name, resetUrl });
  await sendEmail(user.email, "Reset Your Password", html);
};

const sendPasswordResetConfirmation = async (user) => {
  const html = getTemplate("passwordResetConfirmation.html", {
    name: user.name,
  });
  await sendEmail(user.email, "Your Password Has Been Reset", html);
};

const sendCommentNotification = async (
  postAuthor,
  commenter,
  post,
  comment,
) => {
  const html = getTemplate("commentNotification.html", {
    postAuthorName: postAuthor.name,
    commenterName: commenter.role,
    postTitle: post.title,
    commentContent: comment.content,
  });
  await sendEmail(postAuthor.email, `New Comment on "${post.title}"`, html);
};

// const sendReplyNotification = async (
//   commentAuthor,
//   replier,
//   comment,
//   reply,
// ) => {
//   const html = getTemplate("replyNotification.html", {
//     commentAuthorName: commentAuthor.name,
//     replierName: replier.name,
//     commentContent: comment.content,
//     replyContent: reply.content,
//   });
//   await sendEmail(commentAuthor.email, "New Reply to Your Comment", html);
// };

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetConfirmation,
  sendCommentNotification,
  // sendReplyNotification,
};
