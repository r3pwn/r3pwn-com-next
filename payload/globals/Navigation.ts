import { GlobalConfig } from "payload/types";
import { getSupportedIcons } from "../../utils/payload-icons";

const Navigation: GlobalConfig = {
  slug: "navigation",
  typescript: {
    interface: 'NavigationData'
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'navigationLinks',
          type: 'array',
          label: 'Navigation Links',
          labels: {
            singular: 'Link',
            plural: 'Links',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true
            },
            {
              name: 'target',
              type: 'relationship',
              relationTo: 'page',
              required: true
            }
          ]
        }
      ]
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Links',
          labels: {
            singular: 'Link',
            plural: 'Links',
          },
          fields: [
            {
              name: 'ariaLabel',
              type: 'text',
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'icon',
              type: 'select',
              options: getSupportedIcons().map(iconName => ({
                label: `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`,
                value: iconName
              }))
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Open link in new tab',
              defaultValue: false
            }
          ]
        },
        {
          name: "copyrightText",
          type: "text"
        }
      ]
    }
  ]
};

export default Navigation;