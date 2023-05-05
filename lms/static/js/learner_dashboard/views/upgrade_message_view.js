/*
eslint-disable import/no-extraneous-dependencies, import/no-duplicates, import/order, import/no-self-import,
import/no-cycle, import/no-relative-packages, import/no-named-as-default, import/no-named-as-default-member,
import/named, import/no-useless-path-segments
*/
import Backbone from 'backbone';

import HtmlUtils from 'edx-ui-toolkit/js/utils/html-utils';

import upgradeMessageTpl from '../../../templates/learner_dashboard/upgrade_message.underscore';
import upgradeMessageSubscriptionTpl from '../../../templates/learner_dashboard/upgrade_message_subscription.underscore';
import trackECommerceEvents from '../../commerce/track_ecommerce_events';

class UpgradeMessageView extends Backbone.View {
    initialize(options) {
        if (options.isSubscriptionEligible) {
            this.messageTpl = HtmlUtils.template(upgradeMessageSubscriptionTpl);
        } else {
            this.messageTpl = HtmlUtils.template(upgradeMessageTpl);
        }
        this.$el = options.$el;
        this.subscriptionModel = options.subscriptionModel;
        this.render();

        const courseUpsellButtons = this.$el.find('.program_dashboard_course_upsell_button');
        trackECommerceEvents.trackUpsellClick(courseUpsellButtons, 'program_dashboard_course', {
            linkType: 'button',
            pageName: 'program_dashboard',
            linkCategory: 'green_upgrade',
        });
    }

    render() {
        const data = $.extend(
            {},
            this.model.toJSON(),
            this.subscriptionModel.toJSON(),
        );
        HtmlUtils.setHtml(this.$el, this.messageTpl(data));
    }
}

export default UpgradeMessageView;
