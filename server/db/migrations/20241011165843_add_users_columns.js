/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('bio');
        table.string('borough');
        table.string('email');
        table.string('other_form_of_contact');
        table.string('profile_pic');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.alterTable('users', function (table) {
        table.dropColumn('bio');
        table.dropColumn('borough');
        table.dropColumn('email');
        table.dropColumn('other_form_of_contact');
        table.dropColumn('profile_pic');
    });
};
