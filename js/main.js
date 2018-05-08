!function(t,e,a,n){t.extend(t.fn,{accrue:function(e){return e=t.extend({calculationMethod:r},t.fn.accrue.options,e),this.each(function(){var a=t(this);a.find(".form").length||a.append('<div class="form"></div>');o(a,e,"amount"),o(a,e,"rate"),o(a,e,"term");if("compare"==e.mode)o(a,e,"rate_compare");if(".results"===e.response_output_div){0==a.find(".results").length&&a.append('<div class="results"></div>');var n=a.find(".results")}else n=t(e.response_output_div);switch(e.mode){case"basic":var l=r;break;case"compare":l=s;break;case"amortization":l=m}l(a,e,n),"button"==e.operation?(0==a.find("button").length&&a.find(".form").append('<button class="accrue-calculate">'+e.button_label+"</button>"),a.find("button, input[type=submit]").each(function(){t(this).click(function(t){t.preventDefault(),l(a,e,n)})})):a.find("input, select").each(function(){t(this).bind("keyup change",function(){l(a,e,n)})}),a.find("form").each(function(){t(this).submit(function(t){t.preventDefault(),l(a,e,n)})})})}}),t.fn.accrue.options={mode:"basic",operation:"keyup",default_values:{amount:"$7,500",rate:"7%",rate_compare:"1.49%",term:"36m"},field_titles:{amount:"Loan Amount",rate:"Rate (APR)",rate_compare:"Comparison Rate",term:"Term"},button_label:"Calculate",field_comments:{amount:"",rate:"",rate_compare:"",term:"Format: 12m, 36m, 3y, 7y"},response_output_div:".results",response_basic:"<p><strong>Monthly Payment:</strong><br />$%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />$%total_payments%</p><p><strong>Total Interest:</strong><br />$%total_interest%</p>",response_compare:"Save $%savings% in interest!",error_text:"Please fill in all fields.",callback:function(t,e){}};var o=function(t,e,a){var n=t.find("."+a).length?t.find("."+a):t.find(".accrue-"+a).length?t.find(".accrue-"+a):t.find("input[name~="+a+"]").length?t.find("input[name~="+a+"]"):"";return"string"!=typeof n?n.val():"term_compare"!=a&&(t.find(".form").append('<div class="accrue-field-'+a+'"><p><label>'+e.field_titles[a]+':</label><input type="text" class="'+a+'" value="'+e.default_values[a]+'" />'+(e.field_comments[a].length>0?"<small>"+e.field_comments[a]+"</small>":"")+"</p></div>"),t.find("."+a).val())},r=function(e,a,n){var r=t.loanInfo({amount:o(e,a,"amount"),rate:o(e,a,"rate"),term:o(e,a,"term")});if(0!==r){var s=a.response_basic.replace("%payment_amount%",r.payment_amount_formatted).replace("%num_payments%",r.num_payments).replace("%total_payments%",r.total_payments_formatted).replace("%total_interest%",r.total_interest_formatted);n.html(s)}else n.html(a.error_text);a.callback(e,r)},s=function(e,a,n){var r=o(e,a,"term_compare");!1===r&&(r=o(e,a,"term"));var s=t.loanInfo({amount:o(e,a,"amount"),rate:o(e,a,"rate"),term:o(e,a,"term")}),m=t.loanInfo({amount:o(e,a,"amount"),rate:o(e,a,"rate_compare"),term:r}),l={loan_1:s,loan_2:m};if(0!==s&&0!==m){s.total_interest-m.total_interest>0?l.savings=s.total_interest-m.total_interest:l.savings=0;var i=a.response_compare.replace("%savings%",l.savings.toFixed(2)).replace("%loan_2_payment_amount%",m.payment_amount_formatted).replace("%loan_2_num_payments%",m.num_payments).replace("%loan_2_total_payments%",m.total_payments_formatted).replace("%loan_2_total_interest%",m.total_interest_formatted).replace("%loan_1_payment_amount%",s.payment_amount_formatted).replace("%loan_1_num_payments%",s.num_payments).replace("%loan_1_total_payments%",s.total_payments_formatted).replace("%loan_1_total_interest%",s.total_interest_formatted);n.html(i)}else n.html(a.error_text);a.callback(e,l)},m=function(e,a,n){var r=t.loanInfo({amount:o(e,a,"amount"),rate:o(e,a,"rate"),term:o(e,a,"term")});if(0!==r){var s='<table class="accrue-amortization"><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Payment Amt.</th><th class="accrue-total-interest">Total Interest</th><th class="accrue-total-payments">Total Payments</th><th class="accrue-balance">Balance</th></tr>',m=r.payment_amount-r.original_amount/r.num_payments,l=r.payment_amount-m;counter_interest=0,counter_payment=0,counter_balance=parseInt(r.original_amount);for(var i=0;i<r.num_payments;i++){counter_interest+=m,counter_payment+=r.payment_amount,counter_balance-=l;var c="td";i==r.num_payments-1&&(c="th"),s=s+"<tr><"+c+' class="accrue-payment-number">'+(i+1)+"</"+c+"><"+c+' class="accrue-payment-amount">$'+r.payment_amount_formatted+"</"+c+"><"+c+' class="accrue-total-interest">$'+counter_interest.toFixed(2)+"</"+c+"><"+c+' class="accrue-total-payments">$'+counter_payment.toFixed(2)+"</"+c+"><"+c+' class="accrue-balance">$'+counter_balance.toFixed(2)+"</"+c+"></tr>"}s+="</table>",n.html(s)}else n.html(a.error_text);a.callback(e,r)};t.loanInfo=function(t){var e=(void 0!==t.amount?t.amount:0).replace(/[^\d.]/gi,""),a=(void 0!==t.rate?t.rate:0).replace(/[^\d.]/gi,""),n=void 0!==t.term?t.term:0;n=n.match("y")?12*parseInt(n.replace(/[^\d.]/gi,"")):parseInt(n.replace(/[^\d.]/gi,""));var o=a/1200,r=e*(o/(1-Math.pow(1+o,-1*n)));return e*a*n>0?{original_rate:a,original_term:n,original_amount:e,payment_amount:r,payment_amount_formatted:r.toFixed(2),num_payments:n,total_payments:r*n,total_payments_formatted:(r*n).toFixed(2),total_interest:r*n-e,total_interest_formatted:(r*n-e).toFixed(2)}:0}}(jQuery,window,document),$(function(){$(".promotion > div:gt(0)").hide(),setInterval(function(){$(".promotion > div:first").hide().next().show().end().appendTo(".promotion")},3e3)}),$(function(){$(".calculator.home").accrue({mode:"compare",response_output_div:".result.home",response_compare:"You Save: <strong>$%savings%</strong>",error_text:""}),$(".calculator.loan-auto").accrue({mode:"compare",response_output_div:".result.auto",response_compare:"You Save: <strong>$%savings%</strong>",error_text:""}),$(".calculator.loan-personal").accrue({mode:"compare",response_output_div:".result.personal",response_compare:"You Save: <strong>$%savings%</strong>",error_text:""}),$(".numbers-only").keyup(function(){var t=$(this).val().replace(/[^0-9.]/g,"");$(this).val(t)})});var valid_email=function(t){return-1!=String(t).search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)},contact_submit=function(t){$(t).find("input[type=submit]").attr("disabled","disabled");var e=0;$("input[name=reason]:checked").each(function(){e>0&&",",$(this).val(),e++});var a={name:$(t).find("input[name=name]").val(),email:$(t).find("input[name=email]").val(),phone:$(t).find("input[name=phone]").val(),message:$(t).find("textarea").val()},n=$.param(a),o=[],r=$(t).find(".error");return r.html(""),a.name.length<2&&o.push("Please provide a name."),valid_email(a.email)||o.push("Please provide a valid email address."),0==o.length?$.post("/send.php",n,function(t){"success"===t?location.href="/thanks.html":r.html("There was a problem submitting the form. Please call us for further assistance.").slideDown(400)}):(r.html(""),$.each(o,function(t,e){0===t?r.append(e):r.append("<br>"+e)}),r.is(":hidden")&&r.slideDown(400)),!1};$(document).ready(function(){$("form#contact").submit(function(t){t.preventDefault(),contact_submit(this)})});