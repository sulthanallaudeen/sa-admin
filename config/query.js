var dashboard = {
    getData: 'SELECT (SELECT COUNT(*)FROM   blog where status = 1) AS blog_count, (SELECT COUNT(*)FROM   tag where status = 1) AS tag_count, (SELECT COUNT(*)FROM   blog_tag where status = 1) AS blog_tag_count, (SELECT COUNT(*)FROM   mail where status = 0) AS mail_count, (SELECT COUNT(*)FROM   reminder where status = 1 or status = 2) AS reminder_count FROM    dual'
}

var query = {};
query.dashboard = dashboard;
module.exports = query;