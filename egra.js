var instructions, letters, login, test;
test = new Test();
test.name = "EGRA Prototype";
login = new JQueryMobilePage();
instructions = new InstructionsPage();
letters = new LettersPage();
login.page_id = "Login";
login.header = "<h1>EGRA</h1>";
login.content = (new JQueryLogin()).render();
instructions.page_id = "Instructions";
instructions.header = "<h1>EGRA</h1>";
instructions.url = "https://spreadsheets.google.com/pub?key=0Ago31JQPZxZrdGJSZTY2MHU4VlJ3RnNtdnNDVjRjLVE&hl=en&output=html";
instructions.updateFromGoogle();
letters.page_id = "Letters";
letters.header = "<h1>EGRA</h1>";
letters.url = "https://spreadsheets.google.com/pub?key=0Ago31JQPZxZrdC1MeGVqd3FZbXM2RnNFREtoVVZFbmc&hl=en&output=html";
letters.updateFromGoogle();
test.setPages([login, instructions, letters]);
test.save();
test.render(function(result) {
  return $("body").html(result);
});
$('a:contains("start")').click(function() {
  return lettersTimer.start();
});
$('a:contains("stop")').click(function() {
  return lettersTimer.stop();
});
$('a:contains("reset")').click(function() {
  return lettersTimer.reset();
});